
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { campaignService } from '../services/campaign.service';
import { saveCampaign } from '../../src/store/actions/campaign.actions';
import { showErrorMsgRedux, showSuccessMsgRedux } from '../store/actions/app.actions';
import { uploadService } from '../services/upload.service';

import { Formik, Form, Field } from 'formik';
import { Button, TextField } from '@mui/material';

function CustomInput(props) {
    return <TextField {...props} variant='outlined' />
}

// Used an object instead of an enum here since the project is not utilized with TypeScript:
const AdvertisingPlatform = {
    GOOGLE: 'Google',
    TABOOLA: 'Taboola',
    TIKTOK: 'TikTok',
};

export function CampaignForm({ formMode }) {
    const [campaignToEdit, setCampaignToEdit] = useState(campaignService.getEmptyCampaign());
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [fileName, setFileName] = useState('');
    const [mode, setMode] = useState(formMode);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (mode === 'edit') {
            loadCampaign();
        } else {
            setMode('add');
        }
    }, [params.campaignId]);

    function loadCampaign() {
        campaignService.getById(params.campaignId)
            .then((campaign) => {
                setCampaignToEdit(campaign);
            })
            .catch(err => console.log('err:', err));
    }


    const handlePlatformChange = (event) => {
        const { value } = event.target;
        setSelectedPlatform(value);
        handleChange(event);
    };

    async function handleChange(ev) {
        const { name, value, type, files } = ev.target;
        let newValue;

        if (type === 'file') {
            const uploadedImageUrl = await uploadImg(ev);
            newValue = uploadedImageUrl;
            // Set the file name when a file is selected
            if (files.length > 0) {
                setFileName(files[0].name);
            } else {
                setFileName('');
            }
        } else {
            newValue = value;
            console.log('newValue', newValue)
        }

        setCampaignToEdit((prevCampaign) => ({
            ...prevCampaign,
            [name]: newValue,
        }));

        if (name === 'advertisingPlatform') {
            ev.target.value = newValue;
        }
    }

    async function onSaveCampaign() {
        try {
            await saveCampaign(campaignToEdit);
            showSuccessMsgRedux('Campaign saved successfully');
            navigate('/');
        } catch (err) {
            showErrorMsgRedux(`Error while trying to save campaign, ${err}`);
        }
    }

    async function uploadImg(ev) {
        setIsUploading(true)
        const { secure_url } = await uploadService.uploadImg(ev)
        setIsUploading(false)
        console.log('secure_url', secure_url);
        return secure_url
    }

    return (
        <section className="campaign-edit">
            {mode === "add" ? (
                <h1>Add New Campaign</h1>
            ) : (
                <h1>Edit Campaign</h1>
            )}


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

                    <div className="formik-field-edit">
                        <label htmlFor="bannerImageURL">Upload Banner Image</label>
                        <input
                            id="bannerImageURL"
                            name="bannerImageURL"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={(event) => handleChange(event)}
                        />
                        <Button
                            variant="outlined"
                            component="label"
                            htmlFor="bannerImageURL"
                        >
                            {fileName ? fileName : "Choose File"}
                        </Button>
                    </div>

                    <Field
                        className="formik-field-edit"
                        id="advertisingPlatform"
                        as="select"
                        name="advertisingPlatform"
                        label="Select Advertising Platform"
                        onChange={handlePlatformChange}
                        value={selectedPlatform}

                    >
                        {Object.entries(AdvertisingPlatform).map(([key, value]) => (
                            <option key={key} value={value}>
                                {value}
                            </option>
                        ))}
                    </Field>

                    <Button type="submit" variant="contained" disabled={isUploading}>save</Button>
                </Form>
            </Formik>
        </section>
    )
}



