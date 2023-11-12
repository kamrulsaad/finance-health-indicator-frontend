import styled from "styled-components";
import bg from "./assets/bg.png";

function App() {
  return (
    <AppStyled bg={bg}>
      {/* {orbMemo}
  <MainLayout>
    <Navigation active={active} setActive={setActive} />
    <main>
      {displayData()}
    </main>
  </MainLayout> */}
    </AppStyled>
  );
}

const AppStyled = styled.div<{ bg: string }>`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
