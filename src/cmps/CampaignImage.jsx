export function CampaignImage({campaign}) {

    const fallbackImg = "https://res.cloudinary.com/drlt4yjnj/image/upload/v1713960938/campaignManager/utxy7gvtifilfvjpu1zy.png"

    return (

        < div className="img-container" >
            <img className="campaign-img"
                src={campaign.bannerImageURL}
                alt={campaign.name}
                onError={(event) => {
                    event.target.src = fallbackImg;
                }}
            />
        </div>

    )
}
