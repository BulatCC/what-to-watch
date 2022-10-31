type BreadCrumbsProps = {
    crumbsData: {
        title: string;
        link: string;
    }[];
};

const BreadCrumbs = ({ crumbsData }: BreadCrumbsProps) => {
    return (
        <nav className='breadcrumbs'>
            <ul className='breadcrumbs__list'>
                {crumbsData.map(({ title, link }, i) => (
                    <li className='breadcrumbs__item' key={title}>
                        {crumbsData.length === i + 1
                            ?
                            <span className='breadcrumbs__link'>{title}</span>
                            :
                            <a href={link} className='breadcrumbs__link'>{title}</a>
                        }
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export { BreadCrumbs };