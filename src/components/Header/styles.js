import styled from 'styled-components';
import ButtonFlix from '../Button';
import LogoBubbleFlix from '../Logo';

const HeaderFlix = styled.header`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:30px 40px;
    background-color:var(--color-black-dark);
    border-bottom:2px solid var(--color-primary-medium);
    position:fixed;
    width:100vw;
    z-index:999;
    box-sizing:border-box;


    @media(max-width:800px){
        justify-content:center;
        padding:15px 16px;

        & > ${LogoBubbleFlix} {
            height:35px;
        }

        & > ${ButtonFlix}{
        background-color:var(--color-primary-medium);
        border-radius:0;
        border:0;
        position:fixed;
        bottom:0;
        width:100vw;
        text-align:center;
        overflow:hidden;
        }
    }
`;

export default HeaderFlix;
