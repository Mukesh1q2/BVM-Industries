const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-bvm-navy flex items-center justify-center px-4">
            <div className="text-center max-w-lg">
                <div className="text-8xl font-display font-bold text-bvm-blue mb-4">404</div>
                <h1 className="text-3xl font-display font-bold text-white mb-4">
                    Page Not Found
                </h1>
                <p className="text-bvm-gray text-lg mb-8 leading-relaxed">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <a
                    href="/"
                    className="inline-flex items-center gap-2 bg-bvm-blue text-white font-medium px-6 py-3 rounded-lg hover:bg-bvm-blue-dark transition-colors"
                >
                    Back to Home
                </a>
            </div>
        </div>
    );
};

export default NotFoundPage;
