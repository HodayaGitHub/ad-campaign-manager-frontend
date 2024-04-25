// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react";
import { utilService } from "../services/util.service.js";
import { campaignService } from "../services/campaign.service.js";
import { Formik, Form, Field } from 'formik';
import { Button, Select, TextField } from '@mui/material';
import { MultiSelect } from "./MultiSelect";


function CustomInput(props) {
    return <TextField {...props} variant="outlined" />
}


export function CampaignFilter({ filterBy, onSetFilter, campaigns }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [])


    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
        onSetFilter.current(filterByToEdit)
    }


    return (
        <section className="campaign-filter full main-layout">
            <h2>Campaigns Filter</h2>

            <div className="filter-container">

                <div>
                    <Formik
                        initialValues={{
                            txt: '',
                            advertisingPlatform: '',
                        }}
                    >
                        <Form className="formik">
                            <Field className="formik-field-filter"
                                id="txt"
                                as={CustomInput}
                                name="txt"
                                label="Campaign Name"
                                type="text"
                                onChange={handleChange}
                                value={filterByToEdit.txt}
                            />

                            <MultiSelect handleChange={handleChange} />

                        </Form>
                    </Formik>
                </div>
                {/* <SortByForm></SortByForm> */}

            </div>


        </section>
    )
}



