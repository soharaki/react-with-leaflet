import React, { Component } from 'react';
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import 'uikit/dist/css/uikit.css'
import 'uikit/dist/css/uikit.min.css'
import proj4 from 'proj4'
UIkit.use(Icons);

// こちらの記事を参考にさせていただきました。この場をお借りして感謝申し上げます。
// JavaScriptでPROJ4JSを用いて旧日本測地系（SRID=4301）から世界測地系(SRID=4326)へ測地系変換
// https://qiita.com/takahi/items/85732f577820d8f76b3e
proj4.defs([
    ["EPSG:4301", //東京測地系/日本測地系 SRID=4301
        "+proj=longlat +ellps=bessel +towgs84=-146.414,507.337,680.507,0,0,0,0 +no_defs"
    ]
]);

/**
* tokyo2world(日本測地系から世界測地系に変換)
* @param {lon} num - 日本測地系の経度
* @param {lat} num - 日本測地系の緯度
* @return {array} 0：世界測地系の経度 １:世界測地系の緯度
**/
function tokyo2world(lon, lat) {
    var ret = proj4("EPSG:4301", "EPSG:4326", [lon, lat]);
    return ret;
}

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
                        // 日本測地系=>世界測地系に変更
                        var ans = tokyo2world(json[0].geometry.coordinates[0], json[0].geometry.coordinates[1]);
                        this.props.addMark(ans[1], ans[0]);
                    });
                } else {
                    this.setState({ addressName: "正しい郵便番号を設定してください" });
                }
            })
    }
}

export default InputView;