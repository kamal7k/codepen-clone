import React, { useEffect, useState } from 'react'
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";

import { useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import Result from './Result';


const Editor = () => {

  //* create three usestate 
  const [html_edit, setHtml_Edit] = useState('');
  const [css_edit, setCss_Edit] = useState('');
  const [js_edit, setJs_Edit] = useState('');

  //* Html onchange handler 
  const onChangeHtml = useCallback((value) => {
    setHtml_Edit(value);
  }, []);

  //* Css onchange handler 
  const onChangeCss = useCallback((value) => {
    setCss_Edit(value);
  }, []);

  //* JavaScript onchange handler 
  const onChangeJavaScript = useCallback((value) => {
    setJs_Edit(value);
  }, []);

  //* Create Html Document
  const srcCode = `
  <html>
      <body>${html_edit}</body>
      <style>${css_edit}</style>
      <script>${js_edit}</script>
  </html>
`
  return (
    <div className='min-h-screen bg-gray-900'>

      {/* main content  */}
      <div className=" p-2">
        {/* Editor  */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">

          {/* Html Editor */}
          <div className="bg-[#060606] p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2 text-white">HTML</h2>
            <CodeMirror
              className="text-xl"
              value={html_edit}
              height="342px"
              theme="dark"
              extensions={[html(true)]}
              onChange={onChangeHtml}
            />
          </div>

          {/* Css Editor  */}
          <div className="bg-[#060606] p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2 text-white">CSS</h2>
            <CodeMirror
              className="text-xl"
              value={css_edit}
              height="342px"
              theme="dark"
              extensions={[css(true)]}
              onChange={onChangeCss}
            />
          </div>

          {/* JavaScript Editor  */}
          <div className="bg-[#060606] p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2 text-white">JavaScript</h2>
            <CodeMirror
              className="text-xl "
              value={js_edit}
              height="342px"
              theme="dark"
              extensions={[javascript(true)]}
              onChange={onChangeJavaScript}
            />
          </div>
        </div>

        {/* Result  */}
        <Result
          srcCode={srcCode}
        />

      </div>
    </div>
  )
}
export default Editor
