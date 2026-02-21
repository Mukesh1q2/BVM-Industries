import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    image?: string;
    type?: string;
}

const SEO = ({ title, description, image, type = 'website' }: SEOProps) => {
    const siteTitle = 'BVM Industries';
    const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
    const defaultImage = '/new_assets/optimized/bfs-machine.webp';
    const metaImage = image || defaultImage;

    return (
        <Helmet>
            {/* Basic Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={metaImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={metaImage} />
        </Helmet>
    );
};

export default SEO;
