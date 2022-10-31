import { useState, useEffect } from 'react';
import { Overview } from './Overview';
import { Details } from './Details';
import { ReviewList } from './ReviewList';
import { TabNameList } from '../../consts';
import { FilmCardType } from '../../Types/Films';

type TabsProps = {
    tabsData: FilmCardType;
    filmId: string;
}

const defaultTabList = [
    {
        tabName: TabNameList.Overview,
        isActive: true,
    },
    {
        tabName: TabNameList.Details,
        isActive: false,
    },
    {
        tabName: TabNameList.Reviews,
        isActive: false,
    },
];

const Tabs = ({ tabsData: { rating, scoresCount, description, director, starring, runTime, genre, released }, filmId }: TabsProps) => {
    const [tabList, setTabList] = useState(defaultTabList);
    const [activeTab, setActiveTab] = useState(TabNameList.Overview);

    useEffect(() => {
        updateTabList(TabNameList.Overview);
    }, [filmId]);

    const updateTabList = (tab: string) => {
        const updatedTabList = tabList.slice();

        updatedTabList.map((item) => {
            item.isActive = false;
            if (item.tabName === tab) {
                item.isActive = true;
                setActiveTab(item.tabName);
            }
        })

        setTabList(updatedTabList);
    }

    const getTab = (curentTab: string) => {
        switch (curentTab) {
            case TabNameList.Overview:
                return <Overview
                    rating={rating}
                    scoresCount={scoresCount}
                    description={description}
                    director={director}
                    starring={starring}
                />;
            case TabNameList.Details:
                return <Details
                    director={director}
                    starring={starring}
                    runTime={runTime}
                    genre={genre}
                    released={released}
                />;
            case TabNameList.Reviews:
                return <ReviewList id={filmId} />;
        }
    }

    return (
        <>
            <nav className='film-nav film-card__nav'>
                <ul className='film-nav__list'>
                    {tabList.map(({ tabName, isActive }) => (
                        <li className={`film-nav__item ${isActive && 'film-nav__item--active'}`} key={tabName}>
                            <a href='#' className='film-nav__link' onClick={(evt) => {
                                evt.preventDefault();
                                updateTabList(tabName);
                            }}>{tabName}</a>
                        </li>
                    ))}
                </ul>
            </nav>
            {getTab(activeTab)}
        </>
    );
}

export { Tabs };
