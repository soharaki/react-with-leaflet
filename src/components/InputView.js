import React, { Component } from 'react';
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import 'uikit/dist/css/uikit.css'
import 'uikit/dist/css/uikit.min.css'
UIkit.use(Icons);

class InputView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addressName: "住所名を入力してください",
            zip_code: '1100001',
        }
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const { addressName, zip_code } = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <a class="uk-button uk-button-primary" onClick={this.handleClick}>住所を表示</a>

                    <p>
                        <input class="uk-input"
                            type="text" value={zip_code} onChange={(e) => {
                                // 文字入力のたびにStateを更新する
                                this.setState({ zip_code: e.target.value });
                                console.log(zip_code);
                            }} />
                    </p>

                    <p class="uk-text-background">{addressName}</p>

                </header>
            </div>
        );
    }

    // ボタン押下時のイベントトリガー
    handleClick() {
        fetch('https://api.zipaddress.net/?zipcode='+this.state.zip_code, {
            mode: 'cors'
        })
            .then(res => {
                return res.json();
            })
            .then(json => {
                if(json.code === 200){
                    this.setState({ addressName: json.data.fullAddress });
                }else{
                    this.setState({ addressName: "正しい郵便番号を設定してください" });
                }
            })
    }
}

export default InputView;