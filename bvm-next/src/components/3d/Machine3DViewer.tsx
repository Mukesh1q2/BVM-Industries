"use client";
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

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

        // 4. Lights (High-Intensity Setup for PBR GLB Models)
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 3.0);
        hemiLight.position.set(0, 20, 0);
        scene.add(hemiLight);

        const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
        mainLight.position.set(10, 10, 10);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        scene.add(mainLight);

        const fillLight1 = new THREE.DirectionalLight(0xffeedd, 1.5);
        fillLight1.position.set(-10, 10, -10);
        scene.add(fillLight1);

        const fillLight2 = new THREE.DirectionalLight(0xddeeff, 1.5);
        fillLight2.position.set(0, 5, -15);
        scene.add(fillLight2);

        // Ensure tone mapping highlights PBR textures vividly
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;

        // 5. Load Actual GLB Model
        const machineGroup = new THREE.Group();
        scene.add(machineGroup);

        let mixer: THREE.AnimationMixer | null = null;
        const loader = new GLTFLoader();

        loader.load(
            '/machine.glb',
            (gltf) => {
                const model = gltf.scene;

                // Center and scale algorithmically regardless of original CAD size
                const box = new THREE.Box3().setFromObject(model);
                const size = box.getSize(new THREE.Vector3());
                const center = box.getCenter(new THREE.Vector3());

                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 5 / maxDim; // Normalize to 5 units
                model.scale.setScalar(scale);

                model.position.sub(center.multiplyScalar(scale)); // Center it
                model.position.y += (size.y * scale) / 2 - 1.5; // Rest on imaginary ground

                model.traverse((child) => {
                    if ((child as THREE.Mesh).isMesh) {
                        const mesh = child as THREE.Mesh;
                        mesh.castShadow = true;
                        mesh.receiveShadow = true;

                        // Gently enhance metallic properties for cinematic look if materials are standard
                        if (mesh.material instanceof THREE.MeshStandardMaterial) {
                            mesh.material.envMapIntensity = 1.5;
                        }
                    }
                });

                machineGroup.add(model);

                // Setup Animations if present from Trellis
                if (gltf.animations && gltf.animations.length > 0) {
                    mixer = new THREE.AnimationMixer(model);
                    gltf.animations.forEach((clip) => {
                        mixer!.clipAction(clip).play();
                    });
                }

                setIsLoading(false);
            },
            undefined,
            (error) => {
                console.error('Error loading machine GLB:', error);
                setIsLoading(false); // Make sure to hide loader even on error
            }
        );

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

        // 7. Animation Loop
        const clock = new THREE.Clock();
        let animationFrameId: number;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const delta = clock.getDelta(); // Must use delta for AnimationMixer

            if (mixer) {
                mixer.update(delta);
            }

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
            machineGroup.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh;
                    mesh.geometry?.dispose();
                    if (Array.isArray(mesh.material)) {
                        mesh.material.forEach(m => m.dispose());
                    } else if (mesh.material) {
                        mesh.material.dispose();
                    }
                }
            });
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
