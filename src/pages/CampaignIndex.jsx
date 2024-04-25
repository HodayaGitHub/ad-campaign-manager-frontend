import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { loadCampaigns, removeCampaign, saveCampaign } from '../store/actions/campaign.actions.js';

import { campaignService } from '../services/campaign.service';
import { CampaignList } from '../cmps/CampaignList';
import { showSuccessMsgRedux, showErrorMsgRedux } from '../store/actions/app.actions.js';
import { useNavigate } from 'react-router-dom';
import { CampaignSort } from '../cmps/CampaignSort';
import { PlatformStatistics } from '../cmps/statistics/PlatformStatistics.jsx'


export function CampaignIndex() {
    const campaigns = useSelector(storeState => storeState.campaignModule.campaigns);
    const isLoading = useSelector(storeState => storeState.campaignModule.isLoading);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                await loadCampaigns();
            } catch (error) {
                showErrorMsgRedux('Cannot show campaigns');
            }
        }

        fetchData();

    }, []);


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

    return (
        <>
                {!isLoading &&
                    <>
                        <PlatformStatistics />
                        <CampaignList
                            campaigns={campaigns}
                            onEditCampaign={onEditCampaign}
                            onRemoveCampaign={onRemoveCampaign}
                            onCampaignDetails={onCampaignDetails}
                        />
                    </>
                }
        </>
    )
}