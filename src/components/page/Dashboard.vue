<template>
    <div>
        <el-row :gutter="20">
            <h1 class="title-1">Guidance</h1>
            <br>
            <h2 class="title-2">Table of Contents</h2>
            <br>
            <ol>
            <li><a href="#overview">Overview</a></li>
            <li><a href="#parsing">WSDL Parsing</a></li>
            <li><a href="#setting">Parameters Setting</a></li>
            <li><a href="#construction">Partition Construction and DRT Parameter Setting </a></li>
            <li><a href="#generation">Test Cases Preparation</a></li>
            </ol>
            <br>
            <h3>
                <a name="overview"></a>
                Overview
            </h3>
            <p class="content">
                Considering the principle of DRT and the features of web services, we propose a DRT 
                for web services framework, as illustrated below. In the figure, the DRT components 
                are inside the testing box, the practitioner interaction is represented in the initialization box, 
                and the web services under test are located outside. Interactions between DRT components, practitioner
                and the web services are depicted in the framework.
            </p>
            <br>
            <div class="framework">
                <img src="../../assets/framework.png" width=70%>
            </div>
            <br>
            <p class="content">
                We implemented a prototype called DRTester that partially automates DRT for web services. 
                The following content is used to describe the usage of DRTester.
            </p>
            <br>
            <h3>
                <a name="parsing"></a>
                WSDL Parsing
            </h3>
            <p class="content">
                Web service is composed of service and the relevant WSDL document. By parsing the WSDL
                document, we can get the input information for each operation in the service. This includes 
                the names and types of parameters, and any additional requirements that they may have.
            </p>
            <p class="content">
                Practitioners input the address of the web service being tested (the URL of the WSDL), and click 
                the "Parse" button to analyze the input and output formats.
            </p>
            <h3>
                <a name="setting"></a>
                Parameters Setting
            </h3>
            <p class="content">
                Practitioners first needs to select an operation of the web service under test, and then the following 
                table automatically displays the corresponding parameters information, including the names and types of 
                the parameters of selected operation. Besides, practitioners need to divide each parameter into disjoint options 
                according to the specification. There are two rules that practitioners should follow: 1) the values of discrete 
                options are represented by sets; 2) the values of successive options are represented by intervals.
            </p>
            <p class="content">
                We use an explanatory example to illustrate the process of parameters setting. <i>
                Aviation Consignment Management Service (ACMS)</i> helps airline companies check the allowance (weight)
                of free baggage, and the cost of additional baggage. Based on the destination, flights are categorised 
                as either domestic or international. For international flights, the baggage allowance is greater if the 
                passenger is a student (30kg), otherwise it is 20kg. Each aircraft offers three cabins classes from which 
                to choose (economy, business, and first), with passengers in different classes having different allowances.
                The detailed price rules are summarized in our paper:<b>Dynamic Random Testing of Web Services:
                A Methodology and Evaluation</b>. <i>ACMS</i> has an interface, named <i>calculateFee</i> that is responsible 
                for calculating the fee according to the destination, class, and the types of passenhers. The <i>calculateFee</i> 
                interface has the following parameters: airClass, area, isStudent, luggage, and economicfee. We take
                airClass and lugagage example. The details are described as following:
                <table border="1">
                    <tr>
                    <td>parameter</td>
                    <td>type</td>
                    <td>options</td>
                    </tr>
                    <tr>
                    <td>airClass</td>
                    <td>int</td>
                    <td>1-1:{0};1-2:{1};1-3:{2}</td>   
                    </tr>
                    <tr>
                    <td>luggage</td>
                    <td>double</td>
                    <td>2-1:{0};2-2:(0,3000]</td>   
                    </tr>
                </table>
            </p>
            <p class="content">
                In the above table, we use x-y:Z denotes that Z is the values of the y<sup>th</sup> option of the x<sup>th</sup> parameter. 
            </p>
            <h3>
                <a name="construction"></a>
                Partition Construction
            </h3>
            <p class="content">
                Users obtain partition scheme by combining different options that belong to deferrent parameters.
                Take <i>ACMS</i> as an example, we derive partitions only considering airClass and lugagge to make illustration easy.
                The details are described as follow:
                <table border="1">
                    <tr>
                        <td>partitions</td>
                        <td>options</td>
                    </tr>
                    <tr>
                        <td>partition1</td>
                        <td>1-1:{0};2-1:{0}</td>
                    </tr>
                    <tr>
                        <td>partition2</td>
                        <td>1-1{0};2-2:(0,3000]</td>
                    </tr>
                    <tr>
                        <td>partition3</td>
                        <td>1-2{1};2-1:{0}</td>
                    </tr>
                    <tr>
                        <td>partition4</td>
                        <td>1-2{1};2-2:(0,3000]</td>
                    </tr>
                    <tr>
                        <td>partition5</td>
                        <td>1-3{2};2-1:{0}</td>
                    </tr>
                    <tr>
                        <td>partition6</td>
                        <td>1-3{2};2-2:(0,3000]</td>
                    </tr>
                </table>
            </p>
            <h3>
                <a name="generation"></a>
                Test Cases Preparation
            </h3>
            <p class="content">
                There are two ways for users to generate test cases: 1) 
                randomly generate test cases based on the provided information; 2) upload an Json 
                file that contains test cases. For the first method, practitioners The user needs
                to specify the maximum number of test cases to be generated. As for the second method,
                there are some rules for practitioners to create Json file: 1) the index <i>p</i> (which is the natural
                number starting from 0) of partition should be the key. Accordingly, its test cases are the
                corresponding value. Moreover, test cases are also presented in Json format. "testcase_w" presents
                the w<sup>th</sup> test case of partition <i>p</i>. All test cases must contain the "expectedResult" 
                attribute, the value of which is used as an oracle to determine whether the test case reveals a fault.
                The following figure shows a Json file that contains test cases.    
            </p>
            <div>
                <img src="../../assets/json.png" width=50%> 
            </div>
        </el-row>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import bus from '../common/bus';
    import p from '../../assets/framework.png';
    export default {
        name: 'dashboard',
        data() {
            return {
                picture: p
            }
        },
        components: {
            Schart
        },
        computed: {
        },
        created(){
        },
        activated(){
        },
        methods: {
            
        }
    }

</script>


<style scoped>
    p {
    text-indent: 2em;
    line-height: 1.5;
    font-size: 18px;
    }
    ol {
        padding-left: 50px;
        counter-reset: li;
        list-style: none;
        list-style-type: square;
        font-size: 21px;
    }
    h3 {
       font-size: 20px; 
    }
    ol li {
        line-height: 40px;
    }
    .title-1 {
        text-align: center;
    }
    .content {
        text-indent: 2em;
        padding:3px 0;
    }
    .framework {
        text-align: center;
    }
</style>
