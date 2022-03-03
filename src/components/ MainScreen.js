import { Box } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Options from './Options'
import config from '../config'
import Swal from 'sweetalert2'

const Photo = styled.img` 
width: 80%;
height: 70%;
border-radius: 5px;
-webkit-box-shadow: 5px 5px 6px 0px rgba(50, 50, 50, 0.32);
-moz-box-shadow:    5px 5px 6px 0px rgba(50, 50, 50, 0.32);
box-shadow:         5px 5px 6px 0px rgba(50, 50, 50, 0.32);
`
const Descricao = styled.p` 
text-align: center;
padding: 5px;
`
const TitleName = styled.div` 
margin-left: 5px;
display: flex;
justify-content: center;
align-items: flex-end;
`

const PhotoCOntainer = styled.div ` 
height: 60%;
display: flex;
justify-content: center;
align-items: center;
`

const MainScreen = () => {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        showProfile()
    }, [])

    const showProfile = () => {
        axios
            .get(`${config.baseURL}/person`)
            .then((res) => setProfile(res.data.profile))
            .catch((err) => {
                alert("Ocorreu um erro inesperado, tente novamente.")
                console.log(err)
            })
    }

    const choosePerson = (person) => {
        const data = {
            id: person.id,
            choice: true
        }

        axios
            .post(`${config.baseURL}/choose-person`, data, config.axiosConfig)
            .then(async (res) => {
                if (res.data.isMatch) {
                    await Swal.fire(`Opaaaaaaaa, deu match com ${person.name}🔥`)
                }
                showProfile()
            })
            .catch((err) => {
                alert("Ocorreu um erro inesperado, tente novamente.")
                console.log(err)
            })
    }

    if (profile) {
        return (
            <Box sx={{ width: "100%", height: "60vh", display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <PhotoCOntainer>
                    <Photo src={profile.photo} />
                </PhotoCOntainer>
                <TitleName>
                    <h2>{profile.name}</h2>
                    <h2>, {profile.age}</h2>
                </TitleName>
                <Descricao>{profile.bio}</Descricao>

                <Options
                    recusar={showProfile}
                    accept={() => choosePerson(profile)}
                />
            </Box>
        )
    }

    else <p>Carregando</p>
}

export default MainScreen