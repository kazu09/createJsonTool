let blockCounter = 0;

/**
 * ブロック作成時のイベントハンドラー設定
 */
function addFullBlock() {
    addBlock()
    const container = document.getElementById('container');
    const template = document.getElementById('fullTemplate').content.cloneNode(true);

    // 各ブロックにユニークな識別子を割り当て

    // familyブロックにidを設定
    const familyBlock = template.querySelector('div');
    familyBlock.id = 'familyBlock_' + blockCounter;

    // fatherのチェックボックスにイベントを設定
    const fatherCheck = template.querySelector('.fatherCheck');
    fatherEventHandler(fatherCheck)

    // motherのチェックボックスにイベントを設定
    const motherCheck = template.querySelector('.motherCheck');
    motherEventHandler(motherCheck)

    // childrenのチェックボックスにイベントを設定
    const childrenCheck = template.querySelector('.childrenCheck')
    childrenEventHandler(childrenCheck)


    // Childブロックを追加するボタンにイベントを設定
    const childrenButton = template.querySelector('.children-button');
    childButtonEventHandler(childrenButton)

    container.appendChild(template);
}

/**
 * ブロックカウンター
 */
function addBlock() {
    blockCounter++;
}

/**
 * fatherイベントハンドラー
 * @param {checkbox} fatherCheck 
 */
function fatherEventHandler(fatherCheck) {
    fatherCheck.id = 'fatherCheck_' + blockCounter;
    fatherCheck.onchange = function() { 
        toggleDisplay(this, '.father'); 
    };
}

/**
 * motherイベントハンドラー
 * @param {checkbox} motherCheck 
 */
function motherEventHandler(motherCheck) {
    motherCheck.id = 'motherCheck_' + blockCounter;
    motherCheck.onchange = function() {
         toggleDisplay(this, '.mother'); 
    };
}

/**
 * childrenイベントハンドラー
 * @param {checkbox} childrenCheck 
 */
function childrenEventHandler(childrenCheck) {
    childrenCheck.id = 'childrenCheck_' + blockCounter;
    childrenCheck.onchange = function() {
         toggleDisplay(this, '.children'); 
    };
}

/**
 * childボタンイベントハンドラー
 * @param {button} childrenButton 
 */
function childButtonEventHandler(childrenButton) {
    if (childrenButton) {
        childrenButton.onclick = function() { addChildrenBlock(this); };
    }
}

function addChildrenBlock(button) {
    const familyBlock = button.closest('div');
    const childrenContainer = familyBlock.querySelector('.children');
    const template = document.getElementById('childrenTemplate').content.cloneNode(true);
    childrenContainer.appendChild(template);
}

/**
 * 表示・非表示にする
 * @param {checkbox} checkbox 
 * @param {selector} selector 
 */
function toggleDisplay(checkbox, selector) {
    const block = checkbox.closest('div');
    const fields = block.querySelector(selector);
    if (checkbox.checked) {
        // 表示
        fields.style.display = 'block';
    } else {
        // 非表示
        fields.style.display = 'none';
    }
}

/**
 * Jsonを作成する
 */
function createJson() {
    let familyData = [];
    // 追加されたブロックの数に基づいてループ
    for (let i = 1; i <= blockCounter; i++) {
        const block = document.getElementById('familyBlock_' + i);
        if (!block) continue;

        // 初期化
        let familyObj = {};

        // ID
        const familyIdElem = block.querySelector('.family_id');
        if (familyIdElem && familyIdElem.value.length > 0) {
            familyObj.id = familyIdElem.value;
        }

        // father
        const fatherCheck = block.querySelector('.fatherCheck');
        if (fatherCheck.checked) {
            const fatherDiv = block.querySelector('.father');
            familyObj.father = {
                f_name: fatherDiv && fatherDiv.querySelector('.f_name') ? fatherDiv.querySelector('.f_name').value : '',
                f_age: fatherDiv && fatherDiv.querySelector('.f_age') ? fatherDiv.querySelector('.f_age').value : ''
            };
        }

        // mother
        const motherCheck = block.querySelector('.motherCheck');
        if (motherCheck && motherCheck.checked) {
            const motherDiv = block.querySelector('.mother');
            familyObj.mother = {
                m_name: motherDiv && motherDiv.querySelector('.m_name') ? motherDiv.querySelector('.m_name').value : '',
                m_age: motherDiv && motherDiv.querySelector('.m_age') ? motherDiv.querySelector('.m_age').value : ''
            };
        }

        // child
        const childCheck = block.querySelector('.childrenCheck');
        if (childCheck && childCheck.checked) {
            const childrenContainer = block.querySelector('.children');
            if (childrenContainer) {
                familyObj.children = Array.from(childrenContainer.querySelectorAll('.childBlock')).map(childDiv => {
                    return {
                        sex: childDiv.querySelector('.sex') ? childDiv.querySelector('.sex').value : '',
                        c_name: childDiv.querySelector('.c_name') ? childDiv.querySelector('.c_name').value : '',
                        c_age: childDiv.querySelector('.c_age') ? childDiv.querySelector('.c_age').value : ''
                    };
                });
            }
        }

        familyData.push(familyObj);
    }
    const jsonData = JSON.stringify(familyData, null, 2)
    console.info("確認ログ : ", jsonData);
    downloadJson(jsonData)
}

/**
 * ダウンロードする処理
 * @param {Jsonデータ} jsonData 
 */
function downloadJson(jsonData) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonData);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "family.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
