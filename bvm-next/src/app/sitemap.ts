import { MetadataRoute } from 'next'
import { machines } from '@/data/machines'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://bvmindustries.com'

    // Map static routes
    const staticRoutes = [
        '',
        '/about',
        '/quality',
        '/turnkey',
        '/contact',
        '/build-your-line',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Map dynamic machine routes
    const machineRoutes = machines.map((machine) => ({
        url: `${baseUrl}/machines/${machine.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }))

    return [...staticRoutes, ...machineRoutes]
}
