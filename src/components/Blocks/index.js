import { useState } from 'react';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


const Blocks = function () {
  const [blocks, setBlocks] = useState({
    util: [
      'git-clone',
      'git-push',
      'docker-build',
    ],
    onboarding: [
      'aoa',
      'nexusrm',
      'deploy-repo',
    ]
  })

  const [expanded, setExpanded] = useState(false)

  const handleBlocksExpand = () => {
    setExpanded(!expanded)
  }

  const [searchQuery, setSearchQuery] = useState("")
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const blockFilter = category => block => block.includes(searchQuery) || category.includes(searchQuery)

  return <>

    <div className={expanded ? 'blocks expanded' : 'blocks'}>
      <TextField id="outlined-search" label="Search field" type="search" value={searchQuery} onChange={handleSearchChange} />
      {Object.keys(blocks).filter(category => blocks[category].filter(blockFilter(category)).length > 0).map(category =>
        <Accord key={category} category={category} blocks={blocks} blockFilter={blockFilter} />
      )}
      {Object.keys(blocks).filter(category => blocks[category].filter(blockFilter(category)).length > 0).length == 0 && <>
        No Blocks found.
      </>}
    </div>
    <div className={expanded ? 'blocks--expand expanded' : 'blocks--expand'} onClick={handleBlocksExpand}>&gt;</div>
  </>
}

const Accord = ({ category, blocks, blockFilter }) => {

  const [expanded, setExpanded] = React.useState(true);
  const handleChange = () => {
    setExpanded(!expanded);
  };
  return <Accordion expanded={expanded} onChange={handleChange}>
    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
      <Typography>{category}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Category blocks={blocks[category].filter(blockFilter(category))} />
    </AccordionDetails>
  </Accordion>
}

const Category = ({ blocks }) => {
  return <List dense={true}>
    {blocks.map(block =>
      <ListItem key={block}>
        <ListItemText primary={block} />
      </ListItem>
    )}
  </List>
}

export default Blocks