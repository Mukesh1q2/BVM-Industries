import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const Machine3DViewer = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!mountRef.current) return;

        // 1. Scene Setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#0a0f18');

        // 2. Camera
        const camera = new THREE.PerspectiveCamera(
            45,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            100
        );
        camera.position.set(5, 3, 5);

        // 3. Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        mountRef.current.appendChild(renderer.domElement);

        // 4. Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.position.set(10, 10, 10);
        spotLight.angle = 0.15;
        spotLight.penumbra = 1;
        spotLight.castShadow = true;
        scene.add(spotLight);

        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        pointLight.position.set(-10, -10, -10);
        scene.add(pointLight);

        // 5. Abstract Machine Construct
        const machineGroup = new THREE.Group();
        scene.add(machineGroup);

        // Materials
        const darkMetal = new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.8, roughness: 0.2 });
        const lightMetal = new THREE.MeshStandardMaterial({ color: 0x374151, metalness: 0.6, roughness: 0.3 });
        const glass = new THREE.MeshPhysicalMaterial({
            color: 0x87ceeb, transmission: 0.9, opacity: 1, transparent: true, metalness: 0.1, roughness: 0.05
        });
        const glowMaterial = new THREE.MeshStandardMaterial({
            color: 0x3b82f6, emissive: 0x3b82f6, emissiveIntensity: 1, metalness: 0.5, roughness: 0.2
        });

        // Base
        const baseGeo = new THREE.BoxGeometry(4, 0.4, 2);
        const base = new THREE.Mesh(baseGeo, darkMetal);
        base.position.set(0, -1, 0);
        base.castShadow = true;
        base.receiveShadow = true;
        machineGroup.add(base);

        // Cabinet
        const cabinetGeo = new THREE.BoxGeometry(1, 2, 1.5);
        const cabinet = new THREE.Mesh(cabinetGeo, lightMetal);
        cabinet.position.set(-1.2, 0.2, 0);
        cabinet.castShadow = true;
        cabinet.receiveShadow = true;
        machineGroup.add(cabinet);

        // Chamber
        const chamberGeo = new THREE.BoxGeometry(2.5, 2, 1.2);
        const chamber = new THREE.Mesh(chamberGeo, glass);
        chamber.position.set(0.8, 0.2, 0);
        machineGroup.add(chamber);

        // Core (Glowing)
        const coreGeo = new THREE.CylinderGeometry(0.3, 0.3, 1, 32);
        const core = new THREE.Mesh(coreGeo, glowMaterial);
        core.position.set(0.8, 0.2, 0);
        core.castShadow = true;
        machineGroup.add(core);

        // 6. Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enablePan = false;
        controls.minPolarAngle = Math.PI / 4;
        controls.maxPolarAngle = Math.PI / 2;
        controls.minDistance = 4;
        controls.maxDistance = 10;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 2.0;

        setIsLoading(false);

        // 7. Animation Loop
        const clock = new THREE.Clock();
        let animationFrameId: number;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            // Float and pulse animations
            core.position.y = 0.2 + Math.sin(elapsedTime * 2) * 0.1;
            (core.material as THREE.MeshStandardMaterial).emissiveIntensity = 1 + Math.sin(elapsedTime * 3) * 0.5;

            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        // 8. Resize Handler
        const handleResize = () => {
            if (!mountRef.current) return;
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // 9. Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }

            // Dispose Geometries and Materials to prevent memory leaks in React Fast Refresh
            baseGeo.dispose();
            cabinetGeo.dispose();
            chamberGeo.dispose();
            coreGeo.dispose();
            darkMetal.dispose();
            lightMetal.dispose();
            glass.dispose();
            glowMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div className="w-full h-[500px] lg:h-[700px] bg-gradient-to-b from-bvm-navy-light to-bvm-navy rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl">
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
                <h3 className="text-white font-bold text-xl drop-shadow-md tracking-wide">Interactive Digital Twin</h3>
                <p className="text-bvm-blue-light text-sm drop-shadow-md flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-bvm-blue animate-pulse"></span>
                    Live Engineering Preview
                </p>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none text-white/50 text-xs tracking-widest uppercase bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/5">
                Click & Drag to Rotate • Scroll to Zoom
            </div>

            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-bvm-navy z-20">
                    <div className="text-bvm-blue font-bold tracking-widest text-sm uppercase flex flex-col items-center">
                        <div className="w-8 h-8 border-2 border-bvm-blue border-t-transparent rounded-full animate-spin mb-2"></div>
                        Loading 3D Engine
                    </div>
                </div>
            )}

            {/* The DOM element where Three.js will inject its Canvas */}
            <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
        </div>
    );
};

export default Machine3DViewer;
