#!/usr/bin/env python3
# -*- coding: utf_8 -*-

import requests
import time

hostPort = 8094
hostIp = "172.16.90.154"
hostName = "172.16.90.154"
appName = "testservice4"
vipAddress = "testservice4"

def eureka_register():
    register_app()

def register_app():
    body = {
        "instance": {
            "instanceId": hostIp + ":" + str(hostPort),
            "hostName": hostName,
            "app": appName,
            "ipAddr": hostIp,
            "vipAddress": vipAddress,
            "secureVipAddress": vipAddress,
            "status": "UP",
            "overriddenstatus": "UNKNOWN",
            "leaseInfo": {
                "durationInSecs": 30,
                "renewalIntervalInSecs": 15,
            },
            "port": {
                "$": hostPort,
                "@enabled": "true"
            },
            "securePort": {
                "$": 443,
                "@enabled": "false"
            },
            "homePageUrl": "http://" + hostIp + ":" + str(hostPort) + "/",
            "statusPageUrl": "http://" + hostIp + ":" + str(hostPort) + "/info",
            "healthCheckUrl": "http://" + hostIp + ":" + str(hostPort) + "/health",
            "dataCenterInfo": {
                "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
                "name": "MyOwn"
            }
        }
    }

    # url = "http://172.16.90.96:3103/eureka/apps/"+appName
    url = "http://127.0.0.1:8081/eureka/apps/" + appName

    try:
        res = requests.post(url=url, json=body, timeout=5.0)
        if not res.ok:
            print("Eureka register fail:", res.reason)
    except Exception as e:
        print("Eureka register fail:", e)

if __name__ == "__main__":
    eureka_register()
