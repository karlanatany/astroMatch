import logoAstroMatch from '../images/logo-astromatch.png'
import HomeIcon from '@mui/icons-material/Home';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import React from 'react'
import styled from 'styled-components'

const LogoText = styled.img ` 
width: 50%;
height: 50px;
padding-left: 60px;
margin-top: 8px;
`

const ContainerHeader = styled.div ` 
display: flex;
justify-content: space-between;
align-items: center;
height: 50px;
`

const ButtonsHeader = styled.div ` 
cursor: pointer;
padding-right: 5px;
margin-top: 7px;
`
const Header = (props) => {
    return (
        <ContainerHeader>
            <LogoText src={logoAstroMatch} />
            <ButtonsHeader onClick={() => props.changePage('telaAtual')}>
             { props.telaAtual === 'home' ? <LocalFireDepartmentIcon color="secondary"/> : <HomeIcon color="secondary" />}
            </ButtonsHeader>        
        </ContainerHeader>
    )
}
export default Header
