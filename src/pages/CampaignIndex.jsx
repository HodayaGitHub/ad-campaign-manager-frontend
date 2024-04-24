import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { loadCampaigns, removeCampaign, saveCampaign } from '../store/actions/campaign.actions.js'

import { campaignService } from '../services/campaign.service'
import { CampaignList } from '../cmps/CampaignList'
import { showSuccessMsgRedux, showErrorMsgRedux } from '../store/actions/app.actions.js'
import { useNavigate } from 'react-router-dom'
import { CampaignSort } from '../cmps/CampaignSort.jsx'


export function CampaignIndex() {
    const campaigns = useSelector(storeState => storeState.campaignModule.campaigns)
    const isLoading = useSelector(storeState => storeState.campaignModule.isLoading)

    const navigate = useNavigate()

    useEffect(() => {
        // console.log(campaigns)
        loadCampaigns()
            .catch(() => {
                showErrorMsgRedux('Cannot show campaigns')
            })
    }, [])



    async function onAddCampaign() {
        try {
            const campaignToSave = campaignService.getEmptyCampaign()
            const savedCampaign = await saveCampaign(campaignToSave)
            console.log('savedCampaign:', savedCampaign)
            showSuccessMsgRedux(`Campaign added (name: ${savedCampaign.name})`)
        } catch (error) {
            console.error('Cannot add campaign', error)
            showErrorMsgRedux('Cannot add campaign')
        }
    }

    async function onRemoveCampaign(campaignId) {
        try {
            await removeCampaign(campaignId)
            showSuccessMsgRedux(`Removed item with ${campaignId} id successfully`)
        } catch (error) {
            console.error('Cannot remove campaign', error)
            showErrorMsgRedux('Cannot remove campaign')
        }
    }


    function onEditCampaign(campaign) {
        navigate(`/campaign/${campaign._id}`)
    }

    function onCampaignDetails(campaignId) {
        navigate(`/campaign/details/${campaignId}`)
    }

    return (
        <div>
            <main>
                {!isLoading &&
                    <CampaignList
                        campaigns={campaigns}
                        onEditCampaign={onEditCampaign}
                        onRemoveCampaign={onRemoveCampaign}
                        onCampaignDetails={onCampaignDetails}
                    />
                }
            </main>
        </div>
    )
}