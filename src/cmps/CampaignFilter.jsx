import { useEffect, useRef, useState } from "react";
import { utilService } from "../services/util.service.js";
import { Formik, Form, Field } from 'formik';
import { TextField } from '@mui/material';
import { MultiSelect } from "./MultiSelect";


function CustomInput(props) {
    return <TextField {...props} variant="outlined" />
}


export function CampaignFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    onSetFilter = useRef(utilService.debounce(onSetFilter));

    useEffect(() => {
        onSetFilter.current(filterByToEdit);
    }, [filterByToEdit])


    function handleChange({ target }) {
        let { value, name: field, type } = target;
        value = (type === 'number') ? +value : value;
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
        onSetFilter.current(filterByToEdit);
    }


    return (
        <section className="filter-container full main-layout">

            <h2>Campaigns Filters</h2>

            <Formik
                initialValues={{
                    txt: '',
                    advertisingPlatform: '',
                }}
            >
                <Form className="formik campaign-filters">

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
        </section >
    )
}



