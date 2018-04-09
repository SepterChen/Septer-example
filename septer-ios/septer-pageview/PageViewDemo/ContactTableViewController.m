//
//  ContactTableViewController.m
//  PageViewDemo
//
//  Created by 陈良 on 16/5/13.
//  Copyright © 2016年 陈良. All rights reserved.
//

#import "ContactTableViewController.h"

@interface ContactTableViewController ()

@property (nonatomic, strong) NSDictionary *dic;
@property (nonatomic, strong) NSArray *arr;
@end

@implementation ContactTableViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.navigationItem.title = @"通讯录";
    
    NSString *path = [[NSBundle mainBundle] pathForResource:@"contact" ofType:@"plist"];
    _dic = [NSDictionary dictionaryWithContentsOfFile:path];
    //NSLog(@"%@",dic);
    NSArray *arr1 = _dic.allKeys;
    _arr = [arr1 sortedArrayUsingSelector:@selector(compare:)];
    
    self.tableView.sectionFooterHeight = 0;
    self.tableView.sectionIndexColor = [UIColor grayColor];
    self.tableView.sectionIndexBackgroundColor = [UIColor clearColor];
    
    
    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return _arr.count;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    
    return ((NSArray *)[_dic valueForKey:[_arr objectAtIndex:section]]).count ;
}
-(NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section{
    
    return [_arr objectAtIndex:section];
}

-(NSArray<NSString *> *)sectionIndexTitlesForTableView:(UITableView *)tableView{
    return _arr;
}
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    NSString *reuserIdentifier = @"contact";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:reuserIdentifier forIndexPath:indexPath];
    if (cell == nil) {
        cell = [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:reuserIdentifier];
    }
    
    cell.textLabel.text = [[[_dic valueForKey: [_arr objectAtIndex:indexPath.section]] objectAtIndex:indexPath.row] valueForKey:@"name"];
    
    return cell;
}


@end
