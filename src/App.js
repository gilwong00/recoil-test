import React, { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import './App.css';

const repoState = atom({
  key: 'repos',
  default: []
});

function App() {
  const [repos, setRepos] = useRecoilState(repoState);

  useEffect(() => {
    const fetchRepos = async () => {
      const url = `https://ghapi.huchen.dev/repositories?since=monthly`;
      const res = await fetch(url);
      const data = await res.json();
      setRepos(data);
    };

    fetchRepos();
  }, [setRepos]);

  return (
    <>
      {repos.map((repo) => {
        return (
          <div key={repo.url}>
            <a href={repo.url} target='_blank'>
              {repo.name}
            </a>
            <div>{repo.description}</div>
            <div>
              {repo.stars} / {repo.forks} forks
            </div>
          </div>
        );
      })}
    </>
  );
}

export default App;
