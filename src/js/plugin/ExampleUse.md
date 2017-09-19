> ##### input 输入框

    <my-input
        v-model="test"
        label="姓名"
        placeholder="请输入姓名">
        <template slot="before">Http://</template>
        <template slot="after">.com</template>
    </my-input>
    <my-input
            v-model="test"
            label="姓名"
            placeholder="请输入姓名"></my-input>


> ##### button 按钮

    <my-button>submit</my-button>

> ##### checkbox

        <my-checkbox-group v-model="checkGroup" :max="2" :min="1">
                    <my-checkbox label="选择1" disabled></my-checkbox>
                    <my-checkbox label="选择2"></my-checkbox>
                    <my-checkbox label="选择3"></my-checkbox>
        </my-checkbox-group>

> ##### radio

    <my-radio-group v-model="radio">
        <my-radio label="xxx"></my-radio>
        <my-radio label="yyy"></my-radio>
        <my-radio label="kkk"></my-radio>
    </my-radio-group>