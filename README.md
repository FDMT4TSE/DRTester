

# DRTester

The prototype tool *DRTester* can test web services using dynimic random testing techbique. We describe the implemention and configuration of the tool in detail.

## Table of contents
[TOC]

## Framework of DRTester



![The framework of DRTester](C:\Users\phant\Documents\public4drt\DRTester\微信图片_20191015160944.png)

The above figure illustrates the *DRTester* framework, comprising four main parts, corresponding to the top left of web serive is the testing target; *interface* is the interface between the user and *DRTester*; the top right of web service is responsible to parse the addres of the target web service's wsdl, and return information (such as methods and parameters) to *microservice*s that are used to parition input domain, generate test cases, execute test case, and send information to *inteface*. 



 We next examine each component in the framework individually.

### Interface



 We developed this html interface by using the Vue framewok (https://cn.vuejs.org/), which can be obtained by visiting https://github.com/phantomDai/DRTester.
git. 

Once downloading the source code, the user needs to set up the local environment as follows:

- download and install *node.js*
- execute the command: npm install vue -g 
- execute the command: npm install vue-cli -g

After the environment is configured, the user need to go to the downloaded files directory, and execute the following command:

```
npm run dev
```

After the user completes the above steps, he can enter http://localhost:8080 in his browser. Accordingly, the *Guidance* page is visible, describes the steps users  should follow when testing a web service.

![1571128779261](C:\Users\phant\AppData\Roaming\Typora\typora-user-images\1571128779261.png)

Then user can parse wsdl, set parameters, partition input domain, generate test cases, and download test report in the following interfaces.

![1571129087811](C:\Users\phant\AppData\Roaming\Typora\typora-user-images\1571129087811.png)

![1571129104962](C:\Users\phant\AppData\Roaming\Typora\typora-user-images\1571129104962.png)

![1571129121808](C:\Users\phant\AppData\Roaming\Typora\typora-user-images\1571129121808.png)

## WSDL parsing web service 

In order to obtain the necessary to generate test cases and automatically invoke web service under test, we need to parse wsdl of web service under test. Accordingly, a web service has been developed to obtain all methods of web service under test, and their parameters information (name and type). Besides, we also made this web service publicly accessible (https://github.com/phantomDai/parseesdlws.git). 

## Micro services

The back-end logic is composed of several Restful APIs and Java classes: The APIs are responsible for communicating HTTP messages to and from the front-end interface. The controller class is responsible for updating the test profile according to the test results, and for selecting test cases from the partitions. The selected test cases are wrapped in SOAP messages and sent to the web service under test through the proxy class, which also intercepts the test results.





