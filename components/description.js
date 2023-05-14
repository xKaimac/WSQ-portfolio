import styled from "styled-components";

const Container = styled.div`
    padding-left: 5rem;
    padding-right: 5rem;
    max-width: 50%;
    margin-left: auto;
    margin-right: auto;
`

const Text = styled.p`
    font-size: 1rem;
    font-family: 'Times New Roman', Times, serif;
    text-align: center;
`

const Description = ({ text }) => {
    return(
        <Container>
            <Text>
                {text}
            </Text>
        </Container>
    )
}

export default Description;