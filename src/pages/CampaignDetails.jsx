import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { campaignService } from '../services/campaign.service.js'
// import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

function getEmptyMsg() {
    return {
        txt: '',
    }
}

export function CampaignDetails() {
    const [msg, setMsg] = useState(getEmptyMsg())
    const [campaign, setCampaign] = useState(null)
    const { campaignId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadCampaign()
    }, [campaignId])

    async function loadCampaign() {
        try {
            const campaign = await campaignService.getById(campaignId)
            setCampaign(campaign)
        } catch (err) {
            // showErrorMsg('Cant load campaign')
            navigate('/campaign')
        }
    }

    function handleMsgChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setMsg((msg) => ({ ...msg, [field]: value }))
    }

    async function onSaveMsg(ev) {
        ev.preventDefault()
        const savedMsg = await campaignService.addMsg(campaign._id, msg.txt)
        setCampaign((prevCampaign) => ({
            ...prevCampaign,
            msgs: [...(prevCampaign.msgs || []), savedMsg],
        }))
        setMsg(getEmptyMsg())
        // showSuccessMsg('Msg saved!')
    }

    const { txt } = msg

    if (!campaign) return <div>Loading...</div>
    return (
        <section className="campaign-details">
            <h1>{campaign.name}</h1>
            <h5>Price: ${campaign.price}</h5>
            <img src={campaign.src} alt="" />
            <ul>
                {campaign.msgs &&
                    campaign.msgs.map((msg) => (
                        <li key={msg.id}>
                            By: {msg.by.fullname} - {msg.txt}
                            <button
                                type="button"
                                onClick={() => onRemoveMsg(msg.id)}>
                                X
                            </button>
                        </li>
                    ))}
            </ul>
            
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas
                cumque tempore, aperiam sed dolorum rem!
            </p>

            <button> <Link className='back-btn' to={`/campaign`}>Back</Link></button>
        </section>
    )
}
