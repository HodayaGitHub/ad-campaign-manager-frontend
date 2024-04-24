
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { campaignService } from '../services/campaign.service'
import { saveCampaign } from '../../src/store/actions/campaign.actions'
import { showErrorMsgRedux, showSuccessMsgRedux } from "../store/actions/app.actions"

import { Formik, Form, Field } from 'formik'
import { Button, TextField } from '@mui/material'
import * as Yup from 'yup'

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
    function handleChange(ev) {
        const { name, value, type, selectedOptions } = ev.target;
        const newValue =
            type === 'number'
                ? parseFloat(value)
                : type === 'select-multiple'
                    ? Array.from(selectedOptions, (option) => option.value)
                    : value;

        setCampaignToEdit((prevCampaign) => ({
            ...prevCampaign,
            [name]: newValue,
        }))
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



    return (
        <section className="campaign-edit">
            <h1>Edit Campaign</h1>

            <Formik
                initialValues={{
                    txt: '',
                    maxPrice: '',
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

                    <Field className="formik-field"
                        id="price"
                        as={CustomInput}
                        name="price"
                        label="Max Price"
                        type="number"
                        onChange={handleChange}
                        value={campaignToEdit.price || ''}
                    />
                    <Button type="submit" variant="contained">save</Button>
                </Form>
            </Formik>
        </section>
    )
}



