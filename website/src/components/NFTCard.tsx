import { useState } from "react";
import { Card, CardContent, CardHeader, CardActions, CardMedia, Link, Typography, Collapse } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StorefrontIcon from '@mui/icons-material/Storefront';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import ShortenString from '../components/ShortenString';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}
  
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
}));

// @ts-ignore
const NFTCard = (params) => {

    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  
    const metadata = params.metadata;
    const hash = metadata.tokenIpfsUri.replace('https://extinct-sounds.infura-ipfs.io/ipfs/', '')

    const subheader = <Link target="_blank" href={metadata.tokenIpfsUri}>{ShortenString(hash)}</Link>
    const shortenedDescription = metadata.description.slice(0, 140)

    const greenBlock = "🟩 " 
    const blackBlock = "⬛ "
    const redBlock = "🟥 " 

    // @ts-ignore
    const shareButton = async (params) => {

        const numberOfGuesses = Number(params.attributes[0].value)
        const maxGuesses = Number(params.attributes[0].max_value)

        let emojiString = "";
        for (let i = 1; i < maxGuesses+1; i++) {
            if (i < numberOfGuesses) {
                emojiString += redBlock;
            }
            if (i === numberOfGuesses) {
                emojiString += greenBlock;
            }
            if (i > numberOfGuesses) {
                emojiString += blackBlock;
            }
        }
        let clipboardContent = `Extinct-Sounds
${emojiString}
https://extinct-sounds.com`

        try {
            // @ts-ignore
            await navigator.clipboard.writeText(clipboardContent);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    return (
        <Card>
            <CardHeader 
                title={metadata.name} 
                subheader={subheader} 
                action={
                    <Typography sx={{ mr: 1 }}>
                      {metadata.attributes[0].value} / {metadata.attributes[0].max_value}
                    </Typography>
                }    
            />
            <CardMedia src={metadata.animation_url} component="video" controls={true} />

            <CardContent>
                <Typography variant="body2">{shortenedDescription}...</Typography>
            </CardContent>

            <CardActions disableSpacing>    
                <IconButton aria-label="share" onClick={() => {shareButton(metadata)}}>
                    <ShareIcon />
                </IconButton> 

                <IconButton aria-label="opensea" href={params.openseaUrl} target="_blank">
                    <StorefrontIcon />
                </IconButton>

                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="h6">Description:</Typography>
                    <Typography paragraph sx={{ ml: 2 }}>{metadata.description}</Typography>

                    <Typography variant="h6">NFT Info:</Typography>
                    <Typography paragraph sx={{ ml: 2 }}>{metadata.info}</Typography>

                    <Typography variant="h6">NFT Author:</Typography>
                    <Typography paragraph sx={{ ml: 2 }}>{metadata.author}</Typography>

                </CardContent>
            </Collapse>
        </Card>
    )
}
export default NFTCard;