import React, { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import CodeEditor from "./CodeEditor";

function App() {
  const [htmlContent, setHtmlContent] = useLocalStorage('html', '')
  const [cssContent, setCssContent] = useLocalStorage('css', '')
  const [jsContent, setjsContent] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('');
  const [outputHeader, setOutputHeader] = useState('Waiting to compute results')

  useEffect(() => {
    setOutputHeader('Computing....')
    const timeout = setTimeout(() => {
      setSrcDoc(`<html>
      <body>${htmlContent}</body>
      <script>${jsContent}</script>
      <style>${cssContent}</style>
      </html>`);
      setOutputHeader('Results')
    }, 1000);
    return (() => {
      clearTimeout(timeout);
    })
  }, [htmlContent, cssContent, jsContent])

  return (
    <>
      <div className='playarea-header'>
        <h3>Play Area</h3>
      </div>
      <div className="pane top-pane">
        <CodeEditor
          language="xml"
          displayName="HTML"
          value={htmlContent}
          onChange={setHtmlContent}
        />
        <CodeEditor
          language='css'
          displayName='CSS'
          value={cssContent}
          onChange={setCssContent}
        />
        <CodeEditor
          language='javascript'
          displayName='JS'
          value={jsContent}
          onChange={setjsContent}
        />
      </div>
      <div className="pane results">
        <div className='results-header'>
          <h3>{outputHeader}</h3>
        </div>
        <iframe
          srcDoc={srcDoc}
          title='output'
          sandbox='allow-scripts'
          width='100%'
          height='100%' />
      </div>
    </>

  );
}

export default App;
