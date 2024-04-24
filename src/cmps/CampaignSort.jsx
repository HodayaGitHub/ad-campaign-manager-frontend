import React from 'react'

export function CampaignSort({ sortBy, onSetSort }) {

    function handleSortChange(by) {
        const updatedSort = { ...sortBy, by }
        onSetSort(updatedSort)
    }

    function handleToggleDirection() {
        const updatedSort = { ...sortBy, asc: !sortBy.asc }
        onSetSort(updatedSort)
    }

    return <section className="campaign-sort">
        <h3>Sort campaigns:</h3>
        <button onClick={() => handleSortChange('name')}>By name</button>
        <button onClick={() => handleSortChange('price')}>By price</button>
        <button onClick={handleToggleDirection}>Change direction {sortBy.asc ? '^' : 'v'}</button>
    </section>
}
