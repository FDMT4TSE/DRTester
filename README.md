# DRTester

The prototype tool *DRTester* can test web services using dynimic random testing techbique. We describe the implemention and configuration of the tool in detail.

## Framework of DRTester











The above figure illustrates the *DRTester* framework, comprising four main parts, corresponding to the top left of web serive is the testing target; *interface* is the interface between the user and *DRTester*; the top right of web service is responsible to parse the addres of the target web service's wsdl, and return information (such as methods and parameters) to *microservice*s that are used to parition input domain, generate test cases, execute test case, and send information to *inteface*. 



 We next examine each component in the framework individually.



