import React, { useState } from 'react';
import './App.css';

function ChoiceMaker() {
  const [input, setInput] = useState('');
  const [choices, setChoices] = useState([]);
  const [selectedChoice, setSelectedChoice] = useState('');
  const [history, setHistory] = useState([]);  // 新增歷史紀錄

  // 當輸入框改變時更新值
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // 當按下Enter時，將當前輸入加入選項
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input.trim() !== '') {
      if (!choices.includes(input.trim())) {
        setChoices([...choices, input.trim()]);  // 添加新選項
        setInput('');  // 清空輸入框
      } else {
        alert('此選項已經存在');
      }
    }
  };

  // 刪除指定選項
  const handleDeleteChoice = (indexToDelete) => {
    setChoices(choices.filter((_, index) => index !== indexToDelete));
  };

   // 清空所有選項
   const handleClearChoices = () => {
    setChoices([]);
    setSelectedChoice('');
  };

  // 清空歷史紀錄
  const handleClearHistory = () => {
    setHistory([]);
  };

  // 隨機選擇選項並保存至歷史紀錄，且清空選項以便重新開始
  const handleMakeChoice = () => {
    if (choices.length > 0) {
      const randomIndex = Math.floor(Math.random() * choices.length);
      const choice = choices[randomIndex];
      setSelectedChoice(choice);
  // 保存選擇到歷史紀錄，包含當前選項和結果
      setHistory([...history, { selected: choice, options: [...choices] }]);
      setChoices([]);  // 自動清空選項，使用者可以直接輸入下一輪
    }
  };

  // 顯示當時的選項
  const handleShowOptions = (options) => {
    alert(`當時的選項:\n${options.join('\n')}`);
  };

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>隨機選擇器</h1>
      <p className="description">你有選擇障礙嗎，我幫你選擇！</p>
      <p className="description">(輸入選項後Enter確認，確認後按選擇產出結果)</p>
      <input 
        type="text" 
        id="optionInput" 
        placeholder="輸入選項" 
        value={input} 
        onChange={handleInputChange} 
        onKeyPress={handleKeyPress} 
        style={{ width: '300px', padding: '10px' }} 
      />
      <div className="button-container">
        <button className="select-button" onClick={handleMakeChoice} style={{ padding: '10px 20px', margin: '10px' }}>選擇</button>
        <button className="clear-button" onClick={handleClearChoices} style={{ padding: '10px 20px', margin: '10px' }}>清除</button>
      </div>
      <div className="result" id="result">
        {selectedChoice && <h2>我的選擇是: {selectedChoice}</h2>}
      </div>

      {/* 顯示當前選項 */}
      {choices.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>選項：</h3>
          <ul>
            {choices.map((choice, index) => (
              <li key={index}>
                {choice} 
                <button onClick={() => handleDeleteChoice(index)} style={{ marginLeft: '10px' }}>刪除</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 顯示歷史紀錄 */}
      {history.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>歷史紀錄：</h3>
          <ul>
          {history.map((item, index) => (
              <li key={index}>
                <span onClick={() => handleShowOptions(item.options)} style={{ cursor: 'pointer', color: 'blue' }}>
                  {item.selected}
                </span>
              </li>
            ))}
          </ul>
          {/* 清除歷史紀錄按鈕 */}
          <button className="delet-button" onClick={handleClearHistory} style={{ padding: '10px 20px', margin: '10px' }}>清除歷史紀錄</button>
        </div>
      )}
    </div>
  );
}
export default ChoiceMaker;
