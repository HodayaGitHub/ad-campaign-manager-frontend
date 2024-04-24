
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { campaignService } from "../services/campaign.service"
import { saveCampaign } from "../../src/store/actions/campaign.actions"
import { showErrorMsgRedux, showSuccessMsgRedux } from "../store/actions/app.actions"
import { uploadService } from "../services/upload.service"

import { Formik, Form, Field } from "formik"
import { Button, TextField } from "@mui/material"

function CustomInput(props) {
    return <TextField {...props} variant="outlined" />
}


export function CampaignEdit() {
    const [campaignToEdit, setCampaignToEdit] = useState(campaignService.getEmptyCampaign())

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.campaignId) {
            loadCampaign()
        }
    }, [params.campaignId])

    function loadCampaign() {
        campaignService.getById(params.campaignId)
            .then((campaign) => {
                setCampaignToEdit(campaign)
            })
            .catch(err => console.log('err:', err))
    }

    async function handleChange(ev) {
        const { name, value, type } = ev.target;
        let newValue;
    
        if (type === 'number') {
            newValue = parseFloat(value);
        } else if (type === 'file') {
            const uploadedImageUrl = await uploadImg(ev);
            newValue = uploadedImageUrl;
        } else {
            newValue = value;
        }
    
        setCampaignToEdit((prevCampaign) => ({
            ...prevCampaign,
            [name]: newValue,
        }));
    }


    function onSaveCampaign() {
        // ev.preventDefault()
        saveCampaign(campaignToEdit)
            .then(() => {
                showSuccessMsgRedux('Campaign saved successfully')
                navigate('/campaign')
            })
            .catch((err) => {
                showErrorMsgRedux(`Error while trying to save campaign, err`)
            })
    }


    async function uploadImg(ev) {
        // setIsUploading(true)
        const { secure_url } = await uploadService.uploadImg(ev)
        // setIsUploading(false)
        console.log('secure_url', secure_url);
        return secure_url
    }


    return (
        <section className="campaign-edit">
            <h1>Edit Campaign</h1>

            <Formik
                initialValues={{
                    name: '',
                    advertisingPlatform: '',
                    advertiserLandingPage: '',
                    bannerImageURL: '',
                }}
                onSubmit={onSaveCampaign}
            >

                <Form className="formik">
                    <Field className="formik-field-edit"
                        id="name"
                        as={CustomInput}
                        name="name"
                        label="Campaign's Name"
                        type="text"
                        onChange={handleChange}
                        value={campaignToEdit.name || ''}
                    />

                    <Field className="formik-field-edit"
                        id="advertiserLandingPage"
                        as={CustomInput}
                        name="advertiserLandingPage"
                        label="Advertiser Landing Page"
                        type="text"
                        onChange={handleChange}
                        value={campaignToEdit.advertiserLandingPage || ''}
                    />

                    <Field className="formik-field-edit"
                        id="bannerImageURL"
                        name="bannerImageURL"
                        label="Upload Banner Image"
                        type="file"
                        onChange={(event) => {
                            handleChange(event);
                        }}
                    />


                    <Field className="formik-field-edit"
                        id="advertisingPlatform"
                        as="select"
                        name="advertisingPlatform"
                        label="Advertising Platform"
                        onChange={handleChange}
                        value={campaignToEdit.advertisingPlatform || ''}
                    >
                        <option value="">Select Advertising Platform</option>
                        <option value="Google">Google</option>
                        <option value="Taboola">Taboola</option>
                        <option value="TikTok">TikTok</option>
                    </Field>


                    <Button type="submit" variant="contained">save</Button>
                </Form>
            </Formik>
        </section>
    )
}



