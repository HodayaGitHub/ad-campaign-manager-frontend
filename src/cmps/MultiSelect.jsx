import React from 'react'
import { useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useEffect, useRef, useState } from "react"

// Used an object instead of an enum here since the project is not utilized with TypeScript:
const AdvertisingPlatform = {
    GOOGLE: 'Google',
    TABOOLA: 'Taboola',
    TIKTOK: 'TikTok',
};

export function MultiSelect({ handleChange }) {
    const theme = useTheme()
    const [PlatformName, setPlatformName] = React.useState([])



    const ITEM_HEIGHT = 48
    const ITEM_PADDING_TOP = 8

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 220,
            },
        },
    }

    function handleSelect(event) {
        const value = [...event.target.value]

        setPlatformName(
            typeof value === 'string' ? value.split(',') : value,
        )

        const target = { ...event.target, type: 'array' }
        handleChange({ target })
    }

    function getStyles(label, labelName, theme) {
        return {
            fontWeight:
                labelName.indexOf(label) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        }
    }

    return (
        <FormControl className="platform-filter" sx={{ flexGrow: 1, maxWidth: '500px' }}>
            <InputLabel id="name-platform">Advertising Platform</InputLabel>
            <Select
                labelId="name-label"
                id="multiple-platforms"
                name="platform"
                multiple
                value={PlatformName}
                onChange={handleSelect}
                input={<OutlinedInput label="Platforms" />}
                MenuProps={MenuProps}
                sx={{ width: '220px' }}
            >

                {Object.entries(AdvertisingPlatform).map(([key, value]) => (
                    <MenuItem
                        key={value}
                        value={value}
                        style={getStyles(key, PlatformName, theme)}
                    >
                        {value}
                    </MenuItem>
                ))}

            </Select>
        </FormControl>
    )
}

