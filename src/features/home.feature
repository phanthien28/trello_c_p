# @home
# Feature: Create board

   
#     Background: 
#         Given user at the home page 

#     @requireLogin
#     Scenario: Create a new board
#         When user click on Create button
#         And user chooses Create Board option
#         And user enter board tille "My New Board"
#         And user click create button
#         Then user should see the new board "My New Board" in the list of boards

#     @requireLogin
#     Scenario: Create a new board from template
#         When user click on Create button
#         And user chooses Create Board from Template option
#         And user chooses Kanban Template
#         And user click create button
#         Then user should see the new board from template in the list of boards

@home
Feature: Create board
   
    Background: 
        Given user at the home page 

    @requireLogin
    Scenario: Create a new board
        When user click on Create button enter board tille "My New Board"
        And user click create button
        Then user should see the new board "My New Board" in the list of boards

    @requireLogin
    Scenario: Create a new board from template
        When user click on Create button and chooses Kanban Template
        And user click create button
        Then user should see the new board from template in the list of boards

    @requireLogin @deleteBoard
    Scenario: delete boards closed
        When user click View all boards closed and delete
        Then user should see the boards deleted successfully

    @requireLogin @reopenBoard
    Scenario: Reopen boards closed
        When user click View all boards closed and reopen
        Then user should see the boards reopened successfully