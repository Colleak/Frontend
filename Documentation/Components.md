# **Components Documentation**
This document gives insight on how the components are structured.

The components in this project are used to mainly seperate code and to re-use code. This makes the code easier to read and cleaner.

<br><br>

## **Reading guide**
- [Employee List](#employee-list)
- [Employee List Item](#employee-list-item)
- [List Item Status](#list-item-status)

<br><br>

-------------------------------------------------------------------------------------

### **Employee List**
The Employee List component is responsible for getting all employees and processes data such as location, whether they're favorited, and any methods that influence an employee in the list such as favoriting and unfavoriting them. It also sorts employees so that ones that are favorited will be listed at the top of the list. Lastly it lets you interact with the list by searching for names of colleagues and filtering out any names that don't match. It also plays a part in displaying employees on the map of the building.

### **Employee List Item**
The Employee List Item component dictates the format of data that every item in the Employee List should follow. Additionally, it loads all the relevant data that it can. Lastly it allow you to interact with these items in specific ways by handling pings, calls and messages

### **List Item Status**
The List Item Status component handles a call to the MockAPI to get the current status of a colleague, letting you see whether they're available for in-person contact right now and not at home or in a meeting.
