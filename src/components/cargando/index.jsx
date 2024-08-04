import styled from "styled-components"

const Div = styled.div`
    display: flex;
    justify-content: center;
    img{
        width: 30vw;
    }
`

const Cargando = () =>{
    return<Div>
    <img src="./img/loading.jpg" alt="cargando"/>
    </Div>
}

export default Cargando