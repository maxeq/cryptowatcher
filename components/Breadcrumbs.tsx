import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { VscChevronRight } from 'react-icons/vsc';

const Breadcrumbs: React.FC = () => {
    const router = useRouter();
    const path = router.asPath.split('/').filter((segment) => segment);

    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-4 text-md text-gray-300" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
                {path.map((segment, index) => {
                    const url = `/${path.slice(0, index + 1).join('/')}`;
                    const displayText = capitalizeFirstLetter(segment);
                    const isLast = index === path.length - 1;

                    if (segment === 'cryptocurrencies') {
                        return (
                            <React.Fragment key={url}>
                                <li className="breadcrumb-item">
                                    <Link href="/">
                                        <div>{displayText}</div>
                                    </Link>
                                </li>
                                {!isLast && <span className="breadcrumb-separator mx-4">{<VscChevronRight className="mt-1" />}</span>}
                            </React.Fragment>
                        );
                    } else {
                        return (
                            <React.Fragment key={url}>
                                <li className="breadcrumb-item">
                                    <Link href={url}>
                                        <div className='text-white font-semiboldbold'>{displayText}</div>
                                    </Link>
                                </li>
                                {!isLast && <span className="breadcrumb-separator">{< VscChevronRight />}</span>}
                            </React.Fragment>
                        );
                    }
                })}
            </ol>
        </nav >
    );
};

export default Breadcrumbs;
