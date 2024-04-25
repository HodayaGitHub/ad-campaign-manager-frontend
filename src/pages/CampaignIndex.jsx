import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { loadCampaigns, removeCampaign, setFilterBy } from '../store/actions/campaign.actions.js';
import { CampaignList } from '../cmps/CampaignList';
import { showSuccessMsgRedux, showErrorMsgRedux } from '../store/actions/app.actions.js';
import { useNavigate } from 'react-router-dom';
import { PlatformStatistics } from '../cmps/statistics/PlatformStatistics';
import { PieStatistics } from '../cmps/statistics/PieStatistics';
import { CampaignFilter } from '../cmps/CampaignFilter';


export function CampaignIndex() {
    const campaigns = useSelector(storeState => storeState.campaignModule.campaigns);
    const isLoading = useSelector(storeState => storeState.campaignModule.isLoading);
    const filterBy = useSelector(storeState => storeState.campaignModule.filterBy);


    const navigate = useNavigate();

    useEffect(() => {
        fetchCampaigns();
    }, [filterBy]);

    async function fetchCampaigns() {
        try {
            await loadCampaigns(filterBy);
        } catch (error) {
            showErrorMsgRedux('Cannot show campaigns');
        }
    }

    async function onRemoveCampaign(campaignId) {
        try {
            await removeCampaign(campaignId);
            showSuccessMsgRedux(`Removed item with ${campaignId} id successfully`);
        } catch (error) {
            console.error('Cannot remove campaign', error);
            showErrorMsgRedux('Cannot remove campaign');
        }
    }

    function onEditCampaign(campaign) {
        navigate(`/campaign/${campaign._id}`);
    }

    function onCampaignDetails(campaignId) {
        navigate(`/campaign/details/${campaignId}`);
    }

    function onSetFilter(filterBy) {
        console.log('filterBy', filterBy)
        setFilterBy(filterBy);
    }


    return (
        <>
            {!isLoading &&
                <>
                    <CampaignFilter
                        filterBy={filterBy}
                        onSetFilter={onSetFilter} />

                    <section className='main-section'>
                        <div className='data-container'>
                            <PlatformStatistics />
                            <PieStatistics />
                        </div>

                        <CampaignList
                            campaigns={campaigns}
                            onEditCampaign={onEditCampaign}
                            onRemoveCampaign={onRemoveCampaign}
                            onCampaignDetails={onCampaignDetails}
                        />
                    </section>
                </>

            }
        </>
    )
}