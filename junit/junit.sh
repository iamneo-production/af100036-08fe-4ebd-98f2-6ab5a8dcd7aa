#!/bin/bash
if [ -d "/home/coder/project/workspace/springapp/" ]
then
    echo "project folder present"
    # checking for src folder
    if [ -d "/home/coder/project/workspace/springapp/src/" ]
    then
        cp -r /home/coder/project/workspace/junit/test /home/coder/project/workspace/springapp/src/;
    cd /home/coder/project/workspace/springapp/ || exit;
    mvn clean test;
    else
        echo "testCreateEmployee FAILED";
        echo "testGetEmployeeAll FAILED";
        echo "testGetEmployeeById FAILED";
        echo "testCreateJob FAILED";
        echo "testGetJobsAll FAILED";
        echo "testGetJobsById FAILED";
        echo "testGetJobSeekersAll FAILED";
        echo "testGetJobSeekersById FAILED";
        echo "test_case1 FAILED";
        echo "test_case2 FAILED";
    fi
else   
        echo "testCreateEmployee FAILED";
        echo "testGetEmployeeAll FAILED";
        echo "testGetEmployeeById FAILED";
        echo "testCreateJob FAILED";
        echo "testGetJobsAll FAILED";
        echo "testGetJobsById FAILED";
        echo "testGetJobSeekersAll FAILED";
        echo "testGetJobSeekersById FAILED";
        echo "test_case1 FAILED";
        echo "test_case2 FAILED";
fi