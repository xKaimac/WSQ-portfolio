import styled from "styled-components";

const Container = styled.div`
padding:0;
    margin-left: 20vw;
`
const Text = styled.h1`
    font-size: 5rem;
    font-family: 'Times New Roman', Times, serif;
    text-align: center;
`

const Title = ({ text }) => {
    return(
        <Container>
            <Text>
                {text}
            </Text>
        </Container>
    )
}

export default Title;