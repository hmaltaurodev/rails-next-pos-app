require "test_helper"

class PersonsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @person = persons(:one)
  end

  test "should get index" do
    get persons_url, as: :json
    assert_response :success
  end

  test "should create person" do
    assert_difference("Person.count") do
      post persons_url, params: { person: { name: @person.name } }, as: :json
    end

    assert_response :created
  end

  test "should show person" do
    get person_url(@person), as: :json
    assert_response :success
  end

  test "should update person" do
    patch person_url(@person), params: { person: { name: @person.name } }, as: :json
    assert_response :success
  end

  test "should destroy person" do
    assert_difference("Person.count", -1) do
      delete person_url(@person), as: :json
    end

    assert_response :no_content
  end
end
