// header with name, links

const Header = () => {
    return (
        <div className="text-center p-8">
            <h1 className="text-3xl font-bold">HUGO HU</h1>
            <h3>
                <a href="https://www.hugohu.me" className="text-blue-500 underline">
                    https://www.hugohu.me
                </a>
            </h3>
            <h3>
                <a href="mailto:photography@hugohu.me" className="text-blue-500 underline">
                    photography@hugohu.me
                </a>
            </h3>
        </div>
    );
};

export default Header;
