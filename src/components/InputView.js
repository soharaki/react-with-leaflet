import React, { Component } from 'react';
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import 'uikit/dist/css/uikit.css'
import 'uikit/dist/css/uikit.min.css'
import Parser from "fast-xml-parser";
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
                    <p class="uk-text-background">{addressName}</p>
                    <p>
                        <input class="uk-input"
                            type="text" value={zip_code} onChange={(e) => {
                                // 文字入力のたびにStateを更新する
                                this.setState({ zip_code: e.target.value });
                                console.log(zip_code);
                            }} />
                    </p>
                </header>
            </div>
        );
    }

    // ボタン押下時のイベントトリガー
    handleClick() {
        fetch('https://api.zipaddress.net/?zipcode=' + this.state.zip_code, {
            mode: 'cors',
        })
            .then(res => {
                return res.json();
            })
            .then(json => {
                if (json.code === 200) {
                    console.log(json.data);
                    this.setState({ addressName: json.data.fullAddress });

                    fetch('https://msearch.gsi.go.jp/address-search/AddressSearch?q=' + json.data.fullAddress, {
                        mode: 'cors',
                    }).then(res => {
                        return res.json();
                    }).then(json => {
                        this.props.addMark(json[0].geometry.coordinates[1], json[0].geometry.coordinates[0]);
                    });
                } else {
                    this.setState({ addressName: "正しい郵便番号を設定してください" });
                }
            })
    }
}

export default InputView;