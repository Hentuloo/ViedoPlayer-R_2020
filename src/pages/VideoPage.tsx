import React from 'react';
import styled from 'styled-components';
import useVideo from 'hooks/useVideo';

const Wrapper = styled.div`
  color: ${({ theme }) => theme.color.brand[0]};
`;

function App() {
  const [video, state, controls, ref] = useVideo(
    <video
      src="http://techslides.com/demos/sample-videos/small.mp4"
      autoPlay
    />,
  );
  return (
    <Wrapper>
      <header className="App-header">My video title</header>
      <div>
        {video},<pre>{JSON.stringify(state, null, 2)}</pre>
        <button onClick={controls.pause}>Pause</button>
        <button onClick={controls.play}>Play</button>
        <br />
        <button onClick={controls.mute}>Mute</button>
        <button onClick={controls.unmute}>Un-mute</button>
        <br />
        <button onClick={() => controls.volume(0.1)}>
          Volume: 10%
        </button>
        <button onClick={() => controls.volume(0.5)}>
          Volume: 50%
        </button>
        <button onClick={() => controls.volume(1)}>
          Volume: 100%
        </button>
        <br />
        <button onClick={() => controls.seek(state.time - 5)}>
          -5 sec
        </button>
        <button onClick={() => controls.seek(state.time + 5)}>
          +5 sec
        </button>
      </div>
    </Wrapper>
  );
}

export default App;
