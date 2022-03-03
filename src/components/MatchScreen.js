import config from '../config'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Box, Button, Avatar, List, ListItem, ListItemAvatar } from '@mui/material';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import Swal from 'sweetalert2';

const ErrorMessageContainer = styled.div` 
margin: auto;
width: 80%;
margin-top: 30%;
text-align: center;
height: 20%;
padding-top: 20%;
border-radius: 10px;
box-shadow: 10px;
`
const MatchScreen = () => {
    const [matchProfiles, setMatchProfiles] = useState([])

    useEffect(() => {
        getMatches()
    }, [])

    const getMatches = () => {
        axios
            .get(`${config.baseURL}/matches`)
            .then((res) => setMatchProfiles(res.data.matches))
            .catch((err) => Swal.fire('Oooops!', err.message, 'error'))
    }

    const listaMatches = matchProfiles.map((match) => {
        return (
            <List key={match.id} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt={match.nome} src={match.photo} />
                    </ListItemAvatar>
                    <p>{match.name}</p>
                </ListItem>
            </List>
        )
    })

    const limpaMatches = () => {
        axios
            .put(`${config.baseURL}/clear`, config.axiosConfig)
            .then(() => {
                Swal.fire("Seus matches foram removidos com sucesso 🙌 <br> Voltamos pro game de novo🥲")
                getMatches()
            })
            .catch((err) => Swal.fire('Oooops!', err.message, 'error'))
    }

    const confirmClear = async () => {
        const result = await Swal.fire({
            title: 'você tem certeza que não quer chamar ninguém pra conversar?  👀',
            showCancelButton: true,
            confirmButtonText: 'Tenho certeza!',
            cancelButtonText: 'Tá, cancela!'
        })
        if (result.isConfirmed) limpaMatches()
    }

    if (listaMatches.length > 0) {
        return (
            <Box sx={{ height: '90%', overflow: 'auto', width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    {listaMatches}
                    
                <Button color="secondary" startIcon={<PersonRemoveIcon />} onClick={confirmClear}>
                    Remover Matches
                </Button>
            </Box>
        )
    }
    return (
        <ErrorMessageContainer>
            <p>Você não tem matches no momento  😚</p>
        </ErrorMessageContainer>
    )
}
export default MatchScreen
