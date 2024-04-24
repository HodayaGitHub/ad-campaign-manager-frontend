// const { useState, useEffect, useRef } = React

import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"

import { campaignService } from "../services/campaign.service.js"
import { loadLabels } from "../store/actions/campaign.actions.js"
import { Formik, Form, Field } from 'formik'
import { Button, Select, InputLabel, TextField } from '@mui/material'


function CustomInput(props) {
    return <TextField {...props} variant="outlined" />
}


export function CampaignFilter({ filterBy, onSetFilter, campaigns }) {

    const [labelsData, setLabelsData] = useState()
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)

        loadLabels()
            .then((labels) => {
                setLabelsData(labels)
            })
            .catch((error) => {
                console.error('Error loading labels:', error)
            })

    }, [filterByToEdit])

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
                            maxPrice: '',
                            selectedLabel: '',
                        }}
                    >
                        <Form className="formik">
                            <Field className="formik-field-filter"
                                id="name"
                                as={CustomInput}
                                name="txt"
                                label="Campaign Name"
                                type="text"
                                onChange={handleChange}
                                value={filterByToEdit.txt}
                            />

                            <Field className="formik-field-filter"
                                id="maxPrice"
                                as={CustomInput}
                                name="maxPrice"
                                type="number"
                                label="Max Price"
                                onChange={handleChange}
                                value={filterByToEdit.maxPrice || ''}
                            />

                        </Form>
                    </Formik>
                </div>
                {/* <SortByForm></SortByForm> */}

            </div>


        </section>
    )
}



