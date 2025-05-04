@login
Feature: Login system

    Background: 
        Given user navigates to the application "https://trello.com/home"
        And user click login home button
    
    # Scenario: Login with valid credentials
    #     When user enter email "phanthothien204@gmail.com" and password "0867716204ptt"
    #     And user click login button
    #     Then user redirects dashboard

    # Scenario: Login with invalid credentials
    #     When user enter email "phanthothien204@gmail.com" and password "wrong_password"
    #     And user click login button
    #     Then system display error message

    # Scenario: Login only enter email
    #     When user enter email "phanthothien204@gmail.com"
    #     And user click continue button
    #     Then display input password

    # Scenario: Not enter email
    #     When user enter email ""
    #     And user click continue button
    #     Then display alert

    # Scenario: Not enter password
    #     When user enter email "phanthothien204@gmail.com" and password "" 
    #     And user click login button
    #     Then display alert1

    Scenario Outline: Login with valid credentials
        When user enter email "<email>" and password "<password>"
        And user click login button
        Then <expected_result>

    Examples: Login with different credentials
        | email                      | password         | expected_result                |
        | phanthothien204@gmail.com  | 0867716204ptt    | user redirects dashboard       |
        | phanthothien204@gmail.com  | wrong_password   | system display error message   |
        | phanthothien204@gmail.com  |                  | display alert                  |


    Scenario Outline: Login with only email
        When user enter email "<email>"
        And user click continue button
        Then <expected_result>

    Examples:
        | email                     | expected_result           |
        | phanthothien204@gmail.com | display input password    |
        |                           | display alert1            |
        | hello@gmail.com           | redirects sign up page    |