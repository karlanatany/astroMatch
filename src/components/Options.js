import ClearIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import React from 'react'
import styled from 'styled-components'

const ContainerOptions = styled.div` 
display: flex;
justify-content: space-around;
`


function Options(props) {
    return (
        <ContainerOptions>
            <IconButton size="large" onClick={props.recusar}>
                <ClearIcon iconHover sx={{ color: 'red' }} />
            </IconButton>
        
            <IconButton size="large" onClick={props.accept}>
                <FavoriteIcon sx={{ color: 'green' }} />
            </IconButton>
        </ContainerOptions>
    )
}

export default Options
