<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-printer"></i> Console</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-execute" >
                <el-button size="large" type="primary" icon="el-icon-arrow-right" @click="executeNextTestCase">Next</el-button>
            </div>
            <el-row>
                <el-col>
                    <el-table
                        :data="tableTestProcess"
                        stripe
                        style="width: 100%"
                        :border="true"
                        empty-text="Empty"
                        height="500px"
                        size="large"
                        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                        >
                        <el-table-column
                        prop="index"
                        label="Index"
                        width="100"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="testcase"
                        label="Test Cases"
                        width="259"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="partitionIndex"
                        label="Partition"
                        width="100"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="testResult"
                        label="Output"
                        width="100"
                        align="center">
                        </el-table-column>
                        <el-table-column
                        prop="expectedResult"
                        label="Execpted Output"
                        width="150"
                        align="center">
                        </el-table-column>
                        <el-table-column
                            label="Pass(0) / Failed(1)"
                            width="160"
                            align="center">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.isKilledMutant" class="scope-input"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-row>
                <div class="buttonGroupStyle">
                    <el-button-group>
                        <el-button size="large" type="primary" icon="el-icon-video-play" @click="startTest">Start</el-button>
                        <el-button size="large" type="warning" icon="el-icon-warning" @click="stopTest">Stop</el-button>
                        <el-button size="large" type="success" icon="el-icon-circle-check" @click="downloadTest">Download</el-button>
                    </el-button-group>
                </div>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tabs',
        data() {
            return {
                message: 'first',
                showHeader: false,
                tableTestProcess: []
            }
        },
        methods: {
            getData(){},
            startTest() {
                this.$get({
                    url: 'http://202.204.62.25:8082/api/execute/first/testcases',
                    params: {}
                }).then(res => {
                    console.log('res', res);
                    let testingInfo = res.data;
                    if(testingInfo && Object.keys(testingInfo).length) {
                        testingInfo['index'] = this.tableTestProcess.length + 1;
                        this.tableTestProcess.push(testingInfo);
                    } else {
                        this.$message({
                            showClose: true,
                            message: 'Get no data now!',
                            type: 'warning'
                        });
                    }
                });
            },
            executeNextTestCase() {
                if(!this.tableTestProcess.length) {
                    this.$message({
                    showClose: true,
                    message: 'Please start the test first, then you can click the next button!',
                    type: 'warning'
                    });
                    return;
                }
                this.$post({
                    url: 'http://202.204.62.25:8082/api/execute/next/testcases',
                    data: {
                    isKilledMutant: this.tableTestProcess[this.tableTestProcess.length - 1].isKilledMutant,
                    }
                }).then(res => {
                    let testingInfo = res.data;
                    if(testingInfo && Object.keys(testingInfo).length) {
                    testingInfo['index'] = this.tableTestProcess.length + 1;
                    this.tableTestProcess.push(testingInfo);
                    } else {
                    this.$message({
                        showClose: true,
                        message: 'Get no data now!',
                        type: 'warning'
                    });
                    }
                });
            },
            stopTest() {
                this.$message({
                    showClose: true,
                    message: 'stop executing test cases!',
                    type: 'warning'
                });
            },
            downloadTest() {
                let tagA = document.createElement('a');
                tagA.id = 'tag-a';
                tagA.href = 'http://202.204.62.25:8082/api/download/testing/result';
                document.body.appendChild(tagA);
                tagA.click();
                document.body.removeChild(tagA);
            }
        },
        computed: {
            
        }
    }

</script>

<style scoped>
.handle-execute{
    margin-left: 780px;
}
.buttonStyle {
        margin-top: 20px;
        margin-left: 730px;
}
.buttonGroupStyle {
        margin-top: 20px;
        margin-left: 550px;
}
p {
    text-indent: 2em;
    line-height: 1.5;
    font-size: 18px;
}
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}

.scope-input {
    font-size: 18px;
    width: 70px;
}
.scope-input >>> .el-input__inner{
    color: #32CD32;
}
</style>

