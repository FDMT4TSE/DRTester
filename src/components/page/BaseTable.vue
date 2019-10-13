<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator=" " class="handle-el-breadcrumb">
                <el-breadcrumb-item><i class="el-icon-search"></i>Specifying URL</el-breadcrumb-item>
                <!-- <span class="title1">URL Input</span> -->
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="taps">
                <p style="line-height: 1.5; font-size: 24px; color: #20a0ff">
                    Please enter the address of the web service under test
                </p>
                <br>
            </div>
            <div class="handle-box">
                <el-input v-model="select_word" size="large" placeholder="Address" prefix-icon= "el-icon-s-home" class="handle-input mr10" :clearable="true"></el-input>
                <el-button size="large" type="primary" icon="el-icon-data-analysis" @click="parse">Parse</el-button>
            </div>
        </div>
        <div class="crumbs">
            <el-breadcrumb separator="/" class="handle-el-breadcrumb">
                <el-breadcrumb-item><i class="el-icon-edit"></i> Parameters Setting</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="taps">
                <p style="line-height: 1.5; font-size: 24px; color: #20a0ff">
                    Please select an operator:
                </p>
                <br>
                <p>
                    <el-select style="font-size: 22px" size="large" v-model="value" placeholder="Operation" class="handle-operation" @change="handleSelectOperator">
                        <el-option
                        v-for="item in operations"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        >
                        <span style="color: #32CD32; font-size: 22px">{{ item.label }}</span>
                        </el-option>
                    </el-select>
                </p>
                <br>
            </div>
            <el-table
                :data="tableOperations"
                style="width: 100%; font-size: 22px"
                empty-text="Empty"
                size="large"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                :row-class-name="tableRowClassName"
                >
                <el-table-column
                    prop="index"
                    label="Index"
                    width="180"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="parameter"
                    label="Parameter"
                    width="180"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="Type"
                    width="180"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="Options"
                    align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.choice" placeholder="choice" class="scope-input"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div class="buttonsStyle">
                <el-button size="large" type="success" icon="el-icon-circle-check" @click="saveTableOperations">Save</el-button>
            </div>
        </div>
        <div class="crumbs">
            <el-breadcrumb separator="/" class="handle-el-breadcrumb">
                <el-breadcrumb-item><i class="el-icon-menu"></i> Partition Construction and Parameter Setting</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="taps">
                <p style="line-height: 1.5; font-size: 24px; color: #20a0ff">Please input option combinations for partition construction and set parameters for DRT:</p>
            </div>
            <br>
            <el-table
                :data="tablePartitions"
                stripe
                style="width: 100%; font-size: 22px"
                empty-text="Empty"
                height="440px"
                size="large"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                :span-method="arrayRowMethod"
                >
                <el-table-column
                    prop="partition"
                    label="Partition"
                    width="200"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="Option Combination"
                    width="320"
                    align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.choice" placeholder="choices" class="scope-input"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="Test Profile"
                    width="150"
                    align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.profile" placeholder="profile" class="profile-scope-input"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    label="Adjusting Factor"
                    width="200"
                    align="center">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.parameter" placeholder="value" class="parameter-scope-input"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div class="buttonGroupStyle">
                <el-button-group>
                    <el-button @click="add" size="large" type="primary" icon="el-icon-plus">Add</el-button>
                    <el-button @click="deleteRow(-1)" size="large" type="primary" icon="el-icon-minus">Delete</el-button>
                    <el-button size="large" type="success" icon="el-icon-circle-check" @click="saveTablePartitions">Save</el-button>
                </el-button-group>
            </div>
        </div>
        <div class="crumbs">
            <el-breadcrumb separator="/" class="handle-el-breadcrumb">
                <el-breadcrumb-item><i class="el-icon-loading"></i> Test Cases Preparation</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="taps">
                <p style="line-height: 1.5; font-size: 24px; color: #20a0ff">
                    Please select a method to generate a test suite:
                </p>
            </div>
            <br>
            <div class="radiosStyle">
                <!-- <el-radio size="large" v-model="radio1" label="1" border class="handle-radio">Randomly Generate Test Suite</el-radio>
                <el-radio size="large" v-model="radio2" label="2" border>Upload Test Suite File</el-radio> -->
                <el-radio-group size="large" v-model="select_method" @change="changeHandler">
                    <el-radio label="1" border class="handle-radio">Randomly Generate Test Suite</el-radio>
                    <el-radio label="2" border>Upload Test Suite File</el-radio>
                </el-radio-group>
            </div >
            <br>
            <div>
                <el-row :gutter="100">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <p style="line-height: 50px; font-size: 22px; color: #000000">
                                Please set the number of test cases to be generated:
                                <el-input size="large" :disabled="select_method !== '1'" v-model="numberOfTestCases" placeholder="Number" class="handle-numberoftextcase"></el-input>
                                <el-button size="large" type="primary" icon="el-icon-document" @click="generate">Generate</el-button>
                            </p>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div>
                            <p style="line-height: 50px; font-size: 22px; color: #000000; display: inline-block">Please upload an XML file that contains test cases:</p>
                            <el-upload
                            class="handle-upload-button"
                            ref="upload"
                            action="http://202.204.62.171:8082/api/upload/testcase"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :limit="1"
                            :on-exceed="handleExceed"
                            :on-success="handleUploadSuccess"
                            :on-error="handleUploadError"
                            :fileList="fileList">
                            <el-button size="large" icon="el-icon-upload2" type="primary" :loading="isFileUpload">Upload</el-button>
                            </el-upload>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                select_method: '1',
                isRandom: true,
                getTableResData: {},
                numberOfTestCases: '',
                url: './vuetable.json',
                fileList: [],
                isFileUpload: false,
                operations:[],
                value: '',
                // tableOperations:[],
                tablePartitions: [
                    {
                        partition: 'partition',
                        choice: '',
                        profile: '',
                        parameter: ''
                    }
                ],
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1,
                num1: 1,
                isFileUpload: false
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
            }
        },
        methods: {
            getData() {},
            changeHandler(value){
                if (value == '2'){
                    this.isRandom = false
                }
                console.log("改变之后的值为：" + value + "isRandom:" + this.isRandom);
            },
            parse() {
                if(!this.select_word) {
                    this.$message({
                        showClose: true,
                        message: 'Please enter the address!',
                        type: 'warning'
                    });
                    return;
                }
                this.$post({
                    url: 'http://202.204.62.171:8082/api/parse/wsdl',
                    data: {
                        address: this.select_word
                    }
                }).then(res => {
                    console.log(res);
                    this.$message({
                        showClose: true,
                        message: this.select_word,
                        type: 'success'
                    });
                    let tempOptions = Object.keys(res.data);
                    this.operations = tempOptions.map(item => {
                        return {
                            label: item,
                            value: item
                        };
                    });
                    this.getTableResData = res.data;
                });
            },
            handleSelectOperator(val) {
                let temp = this.getTableResData[val];
                if(temp && Object.keys(temp).length) {
                    this.tableOperations = Object.keys(temp).map((item, i) => {
                        return {
                            index: i + 1,
                            parameter: item,
                            type: temp[item],
                            choice: ''
                        };
                    });
                } else {
                    this.$message({
                    showClose: true,
                    message: 'there is no data in this selection!',
                    type: 'warning'
                });
                }
            },
            saveTableOperations() {
                if(!this.value) {
                    this.$message({
                    showClose: true,
                    message: 'Please select an operator!',
                    type: 'warning'
                    });
                    return;
                }   
                let params = {};
                params['functionName'] = this.value;
                if(this.tableOperations.length) {
                    for(let i = 0; i < this.tableOperations.length; i++) {
                        params[this.tableOperations[i].parameter] = this.tableOperations[i].choice;
                    }
                }
                this.$post({
                    url: 'http://202.204.62.171:8082/api/set/choices',
                    data: params
                }).then(res => {
                    console.log(res);
                });
            },
            saveTablePartitions() {
                let params = {};
                if(this.tablePartitions.length) {
                    let temp = this.tablePartitions[0].parameter;
                    for(let i = 0; i < this.tablePartitions.length; i++) {
                    let choice = this.tablePartitions[i].choice ? this.tablePartitions[i].choice : '';
                    let profile = this.tablePartitions[i].profile ? this.tablePartitions[i].profile : '';
                    let parameter = this.tablePartitions[i].parameter ? this.tablePartitions[i].parameter : temp;
                    params[i] = `${choice},${profile},${parameter}`;
                    }
                    this.$post({
                    url: 'http://202.204.62.171:8082/api/set/partitionscheme',
                    data: params
                    }).then(res => {
                    console.log(res);
                    });
                } else {
                    this.$message({
                    showClose: true,
                    message: 'There is no data in tablePartitions!',
                    type: 'warning'
                    });
                }
            },
            generate() {
                if(!this.numberOfTestCases){
                    this.$message({
                        showClose: true,
                        message: 'Please enter the number of needed test cases!',
                        type: 'warning'
                    });
                    return;
                }
                this.$post({
                    url: 'http://202.204.62.171:8082/api/generate/testcases',
                    data: {
                        number: this.numberOfTestCases,
                        flag: this.isRandom
                    }
                }).then(res => {
                    this.$message({
                        showClose: true,
                        message: this.numberOfTestCases,
                        type: 'success'
                    });
                });
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            add(){
                this.tablePartitions.push({
                    partition: 'partition',
                    choice: '',
                    profile: ''
                });
            },
            deleteRow(index){
                if(this.tablePartitions.length > 1) {
                    this.tablePartitions.splice(index, 1);
                } else {
                    this.$message.warning('please save one row at lease')
                }
            },
            arrayRowMethod({ row, column, rowIndex, columnIndex }) {
                if(columnIndex === 3) {
                    return {
                        rowspan: this.tablePartitions.length,
                        colspan: 1
                    }
                }
            },
            handleRemove(file, fileList){
                console.log(file, fileList)
            },
            handleExceed (files, fileList){
                this.$message.warning('only one file')
                this.isFileUpload = false
            },
            beforeRemove (file, fileList){
                return this.$confirm(`Are you sure you want to delete ${file.name}?`)
            },
            handleUploadSuccess(response, file, fileList) {
                this.isFileUpload = false
            },
            handleUploadError(err, file, fileList) {
                this.isFileUpload = false
            }
        }   
    }

</script>

<style scoped>
    .handle-upload-button{
        margin-left: 250px;
        margin-top: -40px;
    }
    .handle-el-breadcrumb{
        font-size: 20px;
    }
    .uploadStyle {
        margin-left: 205px;
    }
    .handle-numberoftextcase {
        width: 90px;
        margin-left:5px;
        margin-right: 5px;
        font-size: 22px;
    }
    .testSuiteStyle {
        margin-top: 20px;
    }
    .radiosStyle {
        margin-top: 20px;
        margin-left: 5px;
    }
    .el-table .warning-row {
        background: #8181F7;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
    .buttonsStyle {
        margin-top: 20px;
        margin-left: 730px;
    }
    .buttonGroupStyle {
       margin-top: 20px;
       margin-left: 530px; 
    }
    .button4 {
        margin-top: 20px;
    }
    .title1 {
        color:aqua;
    }
    .handle-box {
        margin-bottom: 10px;
    }

    .handle-select {
        width: 120px;
    }
    .handle-loadfile{
        display: inline-block;
    }
    .handle-input {
        width: 700px;
        
    }
    .handle-operation{
        width: 700px;
        font-size: 22px;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        font-size: 22px;
        margin-right: 40px;
    }
    .handle-radio{
        margin-right: 220px;
    }
    .upload-wrapper{
        display: flex;
        line-height: 1.5;
        font-size: 20px;
        color: #000000;
    }
    .upload-wrapper{
        flex: 1;
        margin-left: 215px;
    }
    .parameter-scope-input{
        font-size: 22px;
        width: 110px;  
    }
    .profile-scope-input{
        font-size: 22px;
        width: 100px; 
    }
    .scope-input {
        font-size: 22px;
        width: 240px;
    }
    .parameter-scope-input >>> .el-input__inner{
        color: #32CD32;
    }
    .profile-scope-input >>> .el-input__inner{
        color: #32CD32;
    }
    .scope-input >>> .el-input__inner{
        color: #32CD32;
    }
</style>
